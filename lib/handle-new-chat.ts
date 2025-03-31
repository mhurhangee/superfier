'use client'

import { useRouter } from 'next/navigation'
import { mutate } from 'swr'
import { toast } from 'sonner'

export const handleNewChat = async (router: ReturnType<typeof useRouter>) => {

  try {
    const response = await fetch('/api/chat/create', {
      method: 'POST',
    })

    if (!response.ok) {
      const errorMessage = await response.text()
      toast.error(`Failed to create new chat: ${errorMessage}`)
      throw new Error(errorMessage)
    }
    await mutate('/api/chat/history')

    const { id } = await response.json()

    // Navigate programmatically without a full reload
    router.push(`/~/chat/${id}`)
  } catch (error) {
    console.error('Error creating new chat:', error)
    toast.error('Failed to create new chat')
  }
}
