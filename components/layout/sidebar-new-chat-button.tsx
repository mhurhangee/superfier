'use client'

import { Plus } from 'lucide-react'
import { SidebarMenuItem, SidebarMenuButton, SidebarGroup } from '@/components/ui/sidebar'
import { handleNewChat } from '@/lib/handle-new-chat'
import { useRouter } from 'next/navigation'

export function NewChatButton() {
  const router = useRouter()
  return (
    <SidebarGroup>
      <SidebarMenuItem>
        <SidebarMenuButton onClick={() => handleNewChat(router)} >
          <Plus className="h-4 w-4" />
          <span>New chat</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarGroup>
  )
}