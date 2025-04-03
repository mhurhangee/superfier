'use client'

import * as React from 'react'
import { useState } from 'react'
import { GitBranch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useRouter } from 'next/navigation'
import { handleForkChat } from '@/lib/handle-fork-chat'

interface ForkChatModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  chatId: string
}

export function ForkChatModal({ isOpen, onOpenChange, chatId }: ForkChatModalProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleFork = async () => {
    setIsLoading(true)
    try {
      await handleForkChat(chatId, router)
      onOpenChange(false)
    } catch (error) {
      console.error('Error forking chat:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      {isOpen && <div className="fixed inset-0  backdrop-blur-sm z-50" aria-hidden="true" />}
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            Fork Chat
          </DialogTitle>
          <DialogDescription>
            Create a new chat that branches off from the current conversation. Forking allows you to
            explore different directions without affecting the original chat. The fork generates an
            AI summary of the previous conversation for you to continue from.
          </DialogDescription>
        </DialogHeader>
        {/*}        
        <div className="space-y-4 py-4">
          <div className="flex items-start space-x-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="generate-summary"
                checked={generateSummary}
                onCheckedChange={setGenerateSummary}
              />
              <Label
                htmlFor="generate-summary"
                className={`font-medium cursor-pointer ${!generateSummary ? 'text-muted-foreground' : ''}`}
              >
                Generate AI summary of previous conversation
              </Label>
            </div>
          </div>

          <div className="space-y-2 pt-4">
            <div className="flex justify-between items-center">
              <Label className="font-medium">
                Include last {messageCount} message{messageCount !== 1 ? 's' : ''}
              </Label>
              <span className="text-sm text-muted-foreground">{messageCount}</span>
            </div>
            <Slider 
              value={[messageCount]} 
              min={1} 
              max={10} 
              step={1}
              onValueChange={(value) => setMessageCount(value[0])}
            />

          </div>

          <div className="space-y-2 pt-4">
            <Label htmlFor="user-instructions" className="font-medium">
              Additional instructions (optional)
            </Label>
            <Textarea
              id="user-instructions"
              placeholder="Add specific instructions for the AI in the new chat..."
              value={userInstructions}
              onChange={(e) => setUserInstructions(e.target.value)}
              className="min-h-[80px]"
            />

          </div>
        </div>*/}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleFork} disabled={isLoading}>
            {isLoading ? 'Creating...' : 'Fork Chat'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
