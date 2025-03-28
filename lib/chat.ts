import { Message } from "ai";
import { ActionType } from "@/components/chat/confirmation-modal";
import { toast } from "sonner";


const handleDeleteMessage = (index: number, messages: Message[], setMessages: (messages: Message[]) => void) => {
    // Delete the message and all subsequent messages
    const newMessages = messages.slice(0, index);
    setMessages(newMessages);
    toast.success('Message deleted');
};


interface handleConfirmActionParams {
    messages: Message[];
    input: string;
    setInput: (input: string) => void;
    setMessages: (messages: Message[]) => void;
    confirmationState: {
        open: boolean;
        action: ActionType | null;
        index: number | null;
    };
}

// Main confirmation action handler - routes to specific handlers
export const handleConfirmAction = ({
    messages,
    input,
    setInput,
    setMessages,
    confirmationState,
}: handleConfirmActionParams) => {
    const { action, index } = confirmationState;
    if (index === null) return;

    switch (action) {
        case 'delete':
            handleDeleteMessage(index, messages, setMessages);
            break;
    }
};
