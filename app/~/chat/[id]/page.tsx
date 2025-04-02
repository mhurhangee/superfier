import { Suspense } from 'react'
import { ChatContainer } from '@/components/chat/container'
import { Loader2 } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { Message } from 'ai'
import { redirect } from 'next/navigation'
import { ChatSettings } from '@/components/providers/chat-settings'
export default async function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id
  const { userId } = await auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const loadedChat = await prisma.chat.findUnique({
    where: {
      id: id,
      userId: userId,
    },
  })

  if (!loadedChat) {
    return redirect('/~/chat')
  }

  const loadedMessages = loadedChat?.messages as unknown as Message[]
  const loadedSettings = loadedChat?.settings as unknown as ChatSettings

  return (
    <Suspense fallback={
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="size-12 animate-spin" />
      </div>
    }>
      <ChatContainer
        id={id}
        initialMessages={loadedMessages || []}
        initialSettings={loadedSettings}
      />
    </Suspense>
  )
}
