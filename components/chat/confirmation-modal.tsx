'use client';

import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export type ActionType = 'delete' | 'regenerate' | 'edit';

export interface ConfirmationDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    actionType: ActionType | null;
    title?: string;
    description?: string;
    confirmLabel?: string;
    cancelLabel?: string;
}

export function ConfirmationDialog({
    open,
    onOpenChange,
    onConfirm,
    actionType,
    title,
    description = 'This action will remove all subsequent messages and cannot be undone. Are you sure you want to continue?',
    confirmLabel,
    cancelLabel = 'Cancel'
}: ConfirmationDialogProps) {
    
    const defaultTitle = 
        actionType === 'delete'
            ? 'Delete message'
            : actionType === 'regenerate'
                ? 'Regenerate response'
                : actionType === 'edit'
                    ? 'Edit message'
                    : 'Confirm action';
    
    const defaultConfirmLabel =
        actionType === 'delete'
            ? 'Delete'
            : actionType === 'regenerate'
                ? 'Regenerate'
                : actionType === 'edit'
                    ? 'Edit'
                    : 'Confirm';
    
    const displayTitle = title || defaultTitle;
    const displayConfirmLabel = confirmLabel || defaultConfirmLabel;
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{displayTitle}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        {cancelLabel}
                    </Button>
                    <Button
                        variant={actionType === 'delete' ? 'destructive' : 'default'}
                        onClick={() => {
                            onConfirm();
                            onOpenChange(false);
                        }}
                    >
                        {displayConfirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}