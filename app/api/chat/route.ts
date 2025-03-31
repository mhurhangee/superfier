import { openai } from '@ai-sdk/openai'
import { streamText, appendResponseMessages } from 'ai'
import { prisma } from '@/lib/prisma'
import { JsonValue } from '@prisma/client/runtime/library'
import { auth } from '@clerk/nextjs/server'

export const maxDuration = 60

export async function POST(req: Request) {
  const { messages, id } = await req.json()

  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const result = streamText({
    system: 'You are a helpful assistant. Respond to the user in Markdown format.',
    model: openai('gpt-4o-mini'),
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
        },
        update: {
          messages: appendResponseMessages({
            messages,
            responseMessages: response.messages,
          }) as unknown as JsonValue[],
        },
      })
    },
  })

  return result.toDataStreamResponse()
}
