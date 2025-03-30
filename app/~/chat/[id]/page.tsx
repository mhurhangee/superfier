import { Suspense } from 'react'
import { ChatContainer } from '@/components/chat/container'
import { Loader2 } from 'lucide-react'
import { prisma } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { Message } from 'ai'

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

  const loadedMessages = loadedChat?.messages as unknown as Message[]

  return (
    <Suspense fallback={<Loader2 className="size-8 animate-spin" />}>
      <ChatContainer id={id} initialMessages={loadedMessages || []} />
    </Suspense>
  )
}
