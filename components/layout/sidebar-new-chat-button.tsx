'use client'

import { Plus } from 'lucide-react'
import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import { useRouter } from 'next/navigation'
import useSWR from 'swr'

export function NewChatButton() {
  const router = useRouter()
  const { mutate } = useSWR('/api/chat/history')

  const handleNewChat = async () => {
    try {
      const response = await fetch('/api/chat/create', {
        method: 'POST',
      })
      
      if (!response.ok) {
        throw new Error('Failed to create new chat')
      }
      
      const { id } = await response.json()
      
      // Mutate the chat history before navigating
      await mutate()
      
      // Navigate to the new chat
      router.push(`/~/chat/${id}`)
    } catch (error) {
      console.error('Error creating new chat:', error)
    }
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={handleNewChat}>
        <Plus className="h-4 w-4" />
        <span>New chat</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}