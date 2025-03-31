import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuAction,
} from '@/components/ui/sidebar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreVertical } from 'lucide-react'
import Link from 'next/link'
import { Chat } from '@/lib/categorize-chats'
import { handleDeleteChat } from '@/lib/handle-chat-delete'
import { usePathname } from 'next/navigation'

export function ChatGroup({ chats, label }: { chats: Chat[]; label: string }) {
  const pathname = usePathname()

  if (chats.length === 0) return null

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <span>{label}</span>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        {chats.map((chat: Chat) => (
          <SidebarMenuItem key={chat.id}>
            <SidebarMenuButton asChild isActive={pathname === `/~/chat/${chat.id}`}>
              <Link href={`/~/chat/${chat.id}`} className="w-full truncate">
                <span className="w-48 truncate">{chat.messages[0].content}</span>
              </Link>
            </SidebarMenuButton>
            <SidebarMenuAction
              showOnHover
              className="md:opacity-0 group-hover/menu-item:opacity-100 transition-opacity"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" asChild>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                  <DropdownMenuItem onClick={() => handleDeleteChat(chat.id)}>
                    Delete Chat
                  </DropdownMenuItem>
                  <DropdownMenuItem>Cancel</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuAction>
          </SidebarMenuItem>
        ))}
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
