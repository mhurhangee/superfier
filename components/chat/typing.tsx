import { cn } from '@/lib/utils'

export function TypingIndicator({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center space-x-1.5', className)}>
      <div className="h-2 w-2 rounded-full bg-current opacity-60 animate-pulse [animation-delay:-0.3s]" />
      <div className="h-2 w-2 rounded-full bg-current opacity-80 animate-pulse [animation-delay:-0.15s]" />
      <div className="h-2 w-2 rounded-full bg-current animate-pulse" />
    </div>
  )
}
