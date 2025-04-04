import { Loader2 } from 'lucide-react'

export function Streaming({ status, lastMessage }: { status: string; lastMessage: boolean }) {
  return (
    <>
      {lastMessage && status === 'streaming' && (
        <div className="flex items-center justify-center py-2">
          <Loader2 className="h-4 w-4 animate-spin" />
        </div>
      )}
    </>
  )
}
