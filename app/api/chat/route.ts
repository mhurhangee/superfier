import { streamText, appendResponseMessages } from 'ai'
import { prisma } from '@/lib/prisma'
import { JsonValue } from '@prisma/client/runtime/library'
import { auth } from '@clerk/nextjs/server'
import { modelSelector } from '@/lib/model-selector'
import { promptBuilder } from '@/lib/prompt-builder'
import { AnthropicProviderOptions } from '@ai-sdk/anthropic'

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
    throw new Error('Unauthorized')
  }

  const result = streamText({
    system: builtSystemPrompt,
    model: selectedModel,
    temperature: selectedTemperature,
    maxTokens: selectedMaxTokens,
    messages,
    providerOptions: model === "claude" 
    ? { 
      anthropic: {
        thinking: { type: 'enabled', budgetTokens: 12000 },
      } satisfies AnthropicProviderOptions,
    }
    : {},
    async onFinish({ response }) {
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
        },
      })
    },
  })

  return result.toDataStreamResponse({
    sendReasoning: true
  })
}
