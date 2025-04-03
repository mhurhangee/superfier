// app/api/chat/fork/[id]/route.ts
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { createChat } from '@/lib/chat-store'
import { JsonValue } from '@prisma/client/runtime/library'
import { generateText, CoreMessage } from 'ai'
import { openai } from '@ai-sdk/openai'

/**
 * Generates a summary of the conversation based on the provided messages
 */
async function generateConversationSummary(messages: CoreMessage[]): Promise<string> {
  if (!messages || messages.length === 0) {
    return 'No previous conversation to summarize.'
  }
  try {
    // Convert messages to a more readable format for the summary
    const conversationText = messages
      .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
      .join('\n\n')

    const response = await generateText({
      prompt: conversationText,
      system:
        'You will be provided with a conversation between an AI assistant  and a user and your task is to generate a concise summary of the conversation. The summary should focus on the main points, outcomes, overflow all and key takeaways of the conversation. Your summary will be used to continue the conversation.',
      model: openai('gpt-4o-mini'),
      temperature: 0.2,
      maxTokens: 5000,
    })
    return response.text
  } catch (error) {
    console.error('Error generating summary:', error)
    return 'Failed to generate summary.'
  }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const originalChat = await prisma.chat.findUnique({
      where: {
        id,
        userId,
      },
    })

    if (!originalChat) {
      return NextResponse.json({ error: 'Chat not found' }, { status: 404 })
    }

    const newId = await createChat()

    if (!newId) {
      return NextResponse.json({ error: 'Failed to create new chat' }, { status: 500 })
    }

    let messages: CoreMessage[] = []

    // Create a summary message if requested
    // Get all messages for summary generation if needed
    const allMessages = (originalChat.messages as CoreMessage[]) || []
    if (allMessages.length > 0) {
      console.log('Generating summary...')
      console.log('All messages:', allMessages)
      const summaryContent = await generateConversationSummary(allMessages)
      console.log('Summary content:', summaryContent)

      const summaryMessage = {
        role: 'user',
        content: `This is a fork of a previous chat. The user has provided the following of the previous conversation summary: ${summaryContent}`,
      }
      messages = [summaryMessage as CoreMessage, ...messages]
    }

    // Estimate context tokens (4 chars per token is a crude estimation)
    const estimatedTokens = JSON.stringify(messages).length / 4

    const originalSettings = originalChat.settings || {}

    await prisma.chat.update({
      where: {
        id: newId,
      },
      data: {
        messages: messages as unknown as JsonValue[],
        settings: originalSettings,
        contextTokens: Math.round(estimatedTokens),
      },
    })

    return NextResponse.json({ id: newId })
  } catch (error) {
    console.error('Error creating chat:', error)
    return NextResponse.json({ error: 'Failed to create chat' }, { status: 500 })
  }
}
