import { PenTool } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center text-muted-foreground pt-12">
      <PenTool className="h-12 w-12 mb-4 animate-pulse" />
      <p className="text-lg font-medium animate-pulse">What do you want to write about?</p>
      <p className="text-sm animate-pulse">
        Ask me anything about blog writing and I&#39;ll do my best to assist you.
      </p>
    </div>
  )
}
