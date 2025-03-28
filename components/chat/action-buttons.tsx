import { Message } from 'ai'
import { cn } from '@/lib/utils'
import { ActionCopyToClipboard } from './action-copy-to-clipboard'

interface ActionButtonsProps {
    message: Message
    showActions: boolean
}

export function ActionButtons({ message, showActions }: ActionButtonsProps) {

    return (
        <div
            className={cn(
                'flex items-center gap-1 transition-opacity duration-300',
                showActions ? 'opacity-100' : 'opacity-0'
            )}
        >
            <ActionCopyToClipboard message={message} />
        </div>
    )
}