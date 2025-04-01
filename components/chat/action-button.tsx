'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { Trash2, RefreshCw, Pencil } from 'lucide-react'
import { ActionType, SetConfirmationState } from './confirmation-modal'

interface ActionButtonProps {
  actionType: ActionType
  index: number
  setConfirmationState: SetConfirmationState
}

// Icon mapping for different action types
const actionIcons = {
  delete: <Trash2 className="h-2.5 w-2.5" />,
  edit: <Pencil className="h-2.5 w-2.5" />,
  regenerate: <RefreshCw className="h-2.5 w-2.5" />,
}

// Tooltip text mapping for different action types
const actionTooltips = {
  delete: 'Delete message',
  edit: 'Edit message',
  regenerate: 'Regenerate response',
}

export function ActionButton({ actionType, index, setConfirmationState }: ActionButtonProps) {
  const handleAction = (index: number) => {
    setConfirmationState({
      open: true,
      action: actionType,
      index,
    })
  }

  // Use provided values or defaults from mappings
  const displayIcon = actionIcons[actionType]
  const displayTooltip = actionTooltips[actionType]

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-5 w-5 rounded-full"
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
