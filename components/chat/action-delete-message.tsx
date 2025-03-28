'use client'

import { ReactNode } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Trash2, RefreshCw, Pencil } from 'lucide-react'
import { ActionType } from './confirmation-modal'

interface ActionButtonProps {
    actionType: ActionType
    index: number
    setConfirmationState: (state: {
        open: boolean;
        action: ActionType | null;
        index: number | null;
    }) => void
    tooltipText?: string
    icon?: ReactNode
    variant?: "ghost" | "destructive" | "default"
    iconClassName?: string
    buttonClassName?: string
}

// Icon mapping for different action types
const actionIcons = {
    delete: <Trash2 className="h-2.5 w-2.5" />,
    edit: <Pencil className="h-2.5 w-2.5" />,
    regenerate: <RefreshCw className="h-2.5 w-2.5" />
}

// Tooltip text mapping for different action types
const actionTooltips = {
    delete: "Delete message",
    edit: "Edit message", 
    regenerate: "Regenerate response"
}

// Button style mapping for different action types
const actionButtonStyles = {
    delete: "hover:bg-destructive/10 hover:text-destructive",
    edit: "hover:bg-primary/10 hover:text-primary", 
    regenerate: "hover:bg-primary/10 hover:text-primary"
}

export function ActionButton({ 
    actionType, 
    index, 
    setConfirmationState, 
    tooltipText,
    icon,
    variant = "ghost",
    iconClassName = "h-2.5 w-2.5",
    buttonClassName = "h-5 w-5 rounded-full"
}: ActionButtonProps) {

    const handleAction = (index: number) => {
        setConfirmationState({
          open: true,
          action: actionType,
          index,
        });
    };

    // Use provided values or defaults from mappings
    const displayIcon = icon || actionIcons[actionType];
    const displayTooltip = tooltipText || actionTooltips[actionType];
    const buttonStyle = `${buttonClassName} ${actionButtonStyles[actionType]}`;

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    variant={variant}
                    size="icon"
                    className={buttonStyle}
                    onClick={() => handleAction(index)}
                >
                    {displayIcon}
                    <span className="sr-only">{displayTooltip}</span>
                </Button>
            </TooltipTrigger>
            <TooltipContent>
                <p>{displayTooltip}</p>
            </TooltipContent>
        </Tooltip>
    )
}