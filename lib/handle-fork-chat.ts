'use client'

import { useRouter } from 'next/navigation'
import { mutate } from 'swr'
import { toast } from 'sonner'

export const handleForkChat = async (chatId: string, router: ReturnType<typeof useRouter>) => {
  try {
    const response = await fetch(`/api/chat/fork/${chatId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      toast.error(`Failed to fork chat: ${errorMessage}`)
      throw new Error(errorMessage)
    }
    await mutate('/api/chat/history')

    const { id } = await response.json()

    // Navigate programmatically without a full reload
    router.push(`/~/chat/${id}`)
    toast.success('Chat forked successfully')
  } catch (error) {
    console.error('Error forking chat:', error)
    toast.error('Failed to fork chat')
  }
}
