// app/api/chat/[id]/route.ts
import { auth } from '@clerk/nextjs/server'
import { prisma } from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { createChat } from '@/lib/chat-store'

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

    // Get only the last 10 messages or less
    const originalMessages = Array.isArray(originalChat.messages)
      ? originalChat.messages.slice(-3)
      : originalChat.messages || []

    const originalSettings = originalChat.settings || {}

    await prisma.chat.update({
      where: {
        id: newId,
      },
      data: {
        messages: originalMessages,
        settings: originalSettings,
        contextTokens: 0,
      },
    })

    return NextResponse.json({ id: newId })
  } catch (error) {
    console.error('Error creating chat:', error)
    return NextResponse.json({ error: 'Failed to create chat' }, { status: 500 })
  }
}
