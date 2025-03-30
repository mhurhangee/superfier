import { openai } from '@ai-sdk/openai'
import { streamText, appendResponseMessages, Message } from 'ai'
import { prisma } from '@/lib/prisma'
import { JsonValue } from '@prisma/client/runtime/library'

export const maxDuration = 60

export async function POST(req: Request) {
  const { messages, id } = await req.json()

  const result = streamText({
    system: 'You are a helpful assistant. Respond to the user in Markdown format.',
    model: openai('gpt-4o-mini'),
    messages,
    async onFinish({response}) {
      await prisma.chat.update({
        where: {
          id: id
        },
        data: {
          messages: appendResponseMessages({messages, responseMessages: response.messages}) as unknown as JsonValue[]
        }
      })
    }
  })

  return result.toDataStreamResponse()
}
