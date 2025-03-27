import { Suspense } from 'react'
import { ChatContainer } from '@/components/chat/container'
import { Loader2 } from 'lucide-react'

export default function ChatPage() {
  return (
    <Suspense fallback={<Loader2 className="size-8 animate-spin" />}>

        <ChatContainer />

    </Suspense>
  )
}