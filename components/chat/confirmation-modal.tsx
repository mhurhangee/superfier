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

export interface ConfirmationState {
  open: boolean;
  action: ActionType | null;
  index: number | null;
}

export type SetConfirmationState = (state: ConfirmationState) => void;

export interface ConfirmationModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => void;
    actionType: ActionType | null;
}

export function ConfirmationModal({
    open,
    onOpenChange,
    onConfirm,
    actionType
}: ConfirmationModalProps) {
    
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
    
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{defaultTitle}</DialogTitle>
                    <DialogDescription> This action will remove all subsequent messages and cannot be undone. Are you sure you want to continue? </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant={actionType === 'delete' ? 'destructive' : 'default'}
                        onClick={() => {
                            onConfirm();
                            onOpenChange(false);
                        }}
                    >
                        {defaultConfirmLabel}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}