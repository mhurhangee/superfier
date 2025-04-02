import { streamText, appendResponseMessages } from 'ai'
import { prisma } from '@/lib/prisma'
import { JsonValue } from '@prisma/client/runtime/library'
import { auth } from '@clerk/nextjs/server'
import { modelSelector } from '@/lib/model-selector'
import { promptBuilder } from '@/lib/prompt-builder'
import { AnthropicProviderOptions } from '@ai-sdk/anthropic'
import { MAX_CONTEXT_TOKENS } from '@/lib/constants'

export const maxDuration = 60

export async function POST(req: Request) {
  const { messages, id, model, persona, creativity, responseLength } = await req.json()

  const { selectedModel, selectedTemperature, selectedMaxTokens } = modelSelector(
    model,
    creativity,
    responseLength
  )

  const builtSystemPrompt = promptBuilder(persona, creativity, responseLength)

  const { userId } = await auth()

  if (!userId) {
    return new Response('Unauthorized', { status: 401 })
  }

  // Get the current chat if it exists to check token usage
  const existingChat = await prisma.chat.findUnique({
    where: { id, userId },
    select: { contextTokens: true },
  })

  if (!existingChat) {
    return new Response('Chat not found', { status: 404 })
  }

  const currentTokenUsage = existingChat.contextTokens ?? 0
  console.log('Current token usage:', currentTokenUsage)

  if (currentTokenUsage >= MAX_CONTEXT_TOKENS) {
    return new Response('Token limit exceeded', { status: 400 })
  }

  const result = streamText({
    system: builtSystemPrompt,
    model: selectedModel,
    temperature: selectedTemperature,
    maxTokens: selectedMaxTokens,
    messages,
    providerOptions:
      model === 'claude'
        ? {
            anthropic: {
              thinking: { type: 'enabled', budgetTokens: 12000 },
            } satisfies AnthropicProviderOptions,
          }
        : {},
    async onFinish({ response, usage }) {
      await prisma.chat.upsert({
        where: {
          id: id,
          userId: userId,
        },
        create: {
          id: id,
          userId: userId,
          messages: appendResponseMessages({
            messages,
            responseMessages: response.messages,
          }) as unknown as JsonValue[],
          settings: {
            model,
            persona,
            creativity,
            responseLength,
          },
          contextTokens: usage?.totalTokens ?? 0,
        },
        update: {
          messages: appendResponseMessages({
            messages,
            responseMessages: response.messages,
          }) as unknown as JsonValue[],
          settings: {
            model,
            persona,
            creativity,
            responseLength,
          },
          contextTokens: usage?.totalTokens ?? 0,
        },
      })
    },
  })

  return result.toDataStreamResponse({
    sendReasoning: true,
  })
}
