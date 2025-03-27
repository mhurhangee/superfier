"use client"

import { useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { toast } from 'sonner'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { EmptyState } from './empty';
import { MessageList } from './message-list';
import { MessageInput } from './input';
import { ChatError } from './error';

export function ChatContainer() {
    const { messages, input, setInput, append, status } = useChat(
        {
            experimental_throttle: 50,
            onError: () => {
                toast.error('An error occured, please try again!');
            }
        }
    )
    const scrollViewportRef = useRef<HTMLDivElement>(null);

    // Get the last assistant message to determine if it's streaming
    const lastAssistantMessageIndex = messages.findLastIndex(m => m.role === 'assistant');

    useEffect(() => {
        const lastMessageIndex = messages.length - 1;
        if (lastMessageIndex >= 0) {
            setTimeout(() => {
                const lastMessageElement = document.querySelector(`[data-message-role="${messages[lastMessageIndex].role}"][data-message-index="${lastMessageIndex}"]`);
                if (lastMessageElement) {
                    lastMessageElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'end'
                    });
                }
            }, 100);
        }
    }, [messages]);

    return (
        <div className="w-full max-w-4xl mx-auto h-full flex justify-center">
            <Card className="w-full min-w-xs sm:min-w-sm md:min-w-md lg:min-w-2xl xl:min-w-4xl mx-auto h-full flex flex-col border-0 bg-background">
                <CardContent className="flex-1 p-0 pt-6 overflow-hidden">
                    <ScrollArea
                        className="h-full px-6 max-h-[calc(100vh-250px)] scroll-smooth"
                        ref={scrollViewportRef}
                    >
                        <div className="space-y-4 pb-2">
                            {messages.length === 0 ? (
                                <EmptyState />
                            ) : (
                                <MessageList
                                    messages={messages}
                                    status={status}
                                    lastAssistantMessageIndex={lastAssistantMessageIndex}
                                />
                            )}

                            <ChatError status={status} />

                        </div>
                    </ScrollArea>
                </CardContent>

                <MessageInput
                    input={input}
                    setInput={setInput}
                    append={append}
                    status={status}
                />
            </Card>
        </div>
    )
}