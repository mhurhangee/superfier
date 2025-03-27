import { TypingIndicator } from './typing';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { PenTool } from 'lucide-react';

export function Thinking() {
    return (
        <div className="flex items-start gap-3 py-2">
            <div className="flex-shrink-0 pt-1">
                <Avatar className="h-7 w-7">
                    <AvatarFallback className="bg-primary/10 text-primary">
                        <PenTool className="h-3.5 w-3.5" />
                    </AvatarFallback>
                </Avatar>
            </div>
            <div className="text-sm font-mono pt-2">
                <TypingIndicator className="text-muted-foreground" />
            </div>
        </div>
    );
}