'use client'

import { Message } from 'ai'
import { cn } from '@/lib/utils'
import { ActionCopyToClipboard } from './action-copy-to-clipboard'
import { ActionButton } from './action-delete-message'
import { ActionType } from './confirmation-modal'

interface ActionButtonsProps {
    message: Message
    showActions: boolean
    index: number
    setConfirmationState: (state: {
        open: boolean;
        action: ActionType | null;
        index: number | null;
    }) => void;
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

            {/* Only show edit for user messages */}
            {/*isUserMessage && (
                <ActionButton
                    actionType="edit"
                    index={index}
                    setConfirmationState={setConfirmationState}
                />
            )*/}

            {/* Only show regenerate for assistant messages */}
            {/*!isUserMessage && (
                <ActionButton
                    actionType="regenerate"
                    index={index}
                    setConfirmationState={setConfirmationState}
                />
            )*/}
        </div>
    )
}