import { streamText, appendResponseMessages } from 'ai'
import { prisma } from '@/lib/prisma'
import { JsonValue } from '@prisma/client/runtime/library'
import { auth } from '@clerk/nextjs/server'
import { modelSelector } from '@/lib/model-selector'
import { promptBuilder } from '@/lib/prompt-builder'

export const maxDuration = 60

export async function POST(req: Request) {
  const { messages, id, model, persona, creativity, responseLength } = await req.json()

  const { selectedModel, selectedTemperature, selectedMaxTokens } = modelSelector(
    model,
    creativity,
    responseLength
  )

  const builtSystemPrompt = promptBuilder(persona, creativity, responseLength)

  console.log('Selected model:', selectedModel)
  console.log('Selected temperature:', selectedTemperature)
  console.log('Selected max tokens:', selectedMaxTokens)
  console.log('Built system prompt:', builtSystemPrompt)

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
          } as unknown as JsonValue,
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
          } as unknown as JsonValue,
        },
      })
    },
  })

  return result.toDataStreamResponse()
}
