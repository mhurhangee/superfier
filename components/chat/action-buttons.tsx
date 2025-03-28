import { Message } from 'ai'
import { cn } from '@/lib/utils'
import { ActionCopyToClipboard } from './action-copy-to-clipboard'
import { SetConfirmationState } from './confirmation-modal'
import { ActionButton } from './action-button'

interface ActionButtonsProps {
    message: Message
    showActions: boolean
    index: number
    setConfirmationState: SetConfirmationState
}

export function ActionButtons({ message, showActions, index, setConfirmationState }: ActionButtonsProps) {
    const isUserMessage = message.role === 'user';

    return (
        <div
            className={cn(
                'flex items-center gap-1 transition-opacity duration-300',
                showActions ? 'opacity-100' : 'opacity-0'
            )}
        >
            <ActionCopyToClipboard message={message} />
            {isUserMessage && (
                <ActionButton
                    actionType="delete"
                    index={index}
                    setConfirmationState={setConfirmationState}
                />
            )}
        </div>
    )
}