'use client'

import { useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { toast } from 'sonner'
import { Card } from '@/components/ui/card'
import { MessageInput } from './input'
import { ChatHeader } from './header'
import { MessageArea } from './message-area'
import { useScrollToLatestMessage } from '@/hooks/useScrollToLatestMessage'
import { ActionType, ConfirmationDialog } from './confirmation-modal'

export function ChatContainer() {
  const { messages, input, setInput, append, status, setMessages, reload } = useChat({
    experimental_throttle: 50,
    onError: () => {
      toast.error('An error occurred, please try again!')
    },
  })

  useScrollToLatestMessage(messages)

  const [confirmationState, setConfirmationState] = useState<{
    open: boolean;
    action: ActionType | null;
    index: number | null;
  }>({
    open: false,
    action: null,
    index: null,
  });

  // State for message editing
  const [editingMessageIndex, setEditingMessageIndex] = useState<number | null>(null);
  const [editingMessageContent, setEditingMessageContent] = useState('');

  // Handle message deletion with confirmation
  const confirmDeleteMessage = (index: number) => {
    setConfirmationState({
      open: true,
      action: 'delete',
      index,
    });
  };

  const handleDeleteMessage = (index: number) => {
    // Delete the message and all subsequent messages
    const newMessages = messages.slice(0, index);
    setMessages(newMessages);
    toast.success('Message deleted');
  };

  // Handle regenerate response with confirmation
  const confirmRegenerateResponse = (index: number) => {
    setConfirmationState({
      open: true,
      action: 'regenerate',
      index,
    });
  };

  const handleRegenerateResponse = (index: number) => {
    if (index % 2 === 1) {
      // If it's an AI message (odd index)
      // Get the user message before this AI message
      const userMessageIndex = index - 1;
      if (userMessageIndex >= 0) {
        // Keep messages up to and including the user message
        const newMessages = messages.slice(0, userMessageIndex + 1);
        setMessages(newMessages);
        // Then reload to generate a new AI response
        reload();
        toast.success('Regenerating response...');
      }
    }
  };

  // Handle edit message with confirmation
  const confirmEditMessage = (index: number) => {
    if (index % 2 === 0) {
      // Only user messages can be edited
      setConfirmationState({
        open: true,
        action: 'edit',
        index,
      });
    }
  };

  const startEditingMessage = (index: number) => {
    setEditingMessageIndex(index);
    setEditingMessageContent(messages?.[index]?.content || '');
    toast.info('Editing message...');
  };

  const cancelEditingMessage = () => {
    setEditingMessageIndex(null);
    setEditingMessageContent('');
  };

  // Main confirmation action handler - routes to specific handlers
  const handleConfirmAction = () => {
    const { action, index } = confirmationState;
    if (index === null) return;

    switch (action) {
      case 'delete':
        handleDeleteMessage(index);
        break;
      case 'regenerate':
        handleRegenerateResponse(index);
        break;
      case 'edit':
        startEditingMessage(index);
        // Also trim messages after this point
        const editedMessages = messages.slice(0, index);
        setMessages(editedMessages);
        // Set the input field with the message content
        setInput(messages[index].content);
        break;
    }
  };


  return (
    <div className="w-full max-w-4xl mx-auto h-full flex justify-center">
      <Card className="w-full min-w-xs sm:min-w-sm md:min-w-md lg:min-w-2xl xl:min-w-4xl mx-auto h-full flex flex-col border-0 bg-background">
        <ChatHeader setInput={setInput} setMessages={setMessages} />
        <MessageArea 
          messages={messages} 
          status={status} 
          setConfirmationState={setConfirmationState}
          editingMessageIndex={editingMessageIndex}
          editingMessageContent={editingMessageContent}
          setEditingMessageContent={setEditingMessageContent}
        />
        <MessageInput 
          input={input} 
          setInput={setInput} 
          append={append} 
          status={status}
          isEditing={editingMessageIndex !== null}
          onCancelEditing={cancelEditingMessage}
        />
      </Card>
      <ConfirmationDialog
        open={confirmationState.open}
        onOpenChange={(open) => setConfirmationState({ ...confirmationState, open })}
        onConfirm={handleConfirmAction}
        actionType={confirmationState.action}
      />
    </div>
  )
}
