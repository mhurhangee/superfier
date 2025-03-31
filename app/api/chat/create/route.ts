// app/api/chat/create/route.ts
import { NextResponse } from 'next/server'
import { createChat } from '@/lib/chat-store'

export async function POST() {
  try {
    const id = await createChat()
    return NextResponse.json({ id })
  } catch (error) {
    console.error('Error creating chat:', error)
    return NextResponse.json({ error: 'Failed to create chat' }, { status: 500 })
  }
}