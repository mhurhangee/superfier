import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenuItem,
  SidebarMenuButton,
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
import { handleDeleteChat } from '@/lib/handle-delete-chat'
import { useRouter, usePathname } from 'next/navigation'

export function ChatGroup({ chats, label }: { chats: Chat[]; label: string }) {
  const router = useRouter()
  const pathname = usePathname()

  if (chats.length === 0) return null

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        <span>{label}</span>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        {chats.map((chat: Chat) => {
          const isActive = pathname === `/~/chat/${chat.id}`
          return (
            <SidebarMenuItem key={chat.id} className="flex justify-between items-center group">
              <SidebarMenuButton asChild isActive={isActive}>
                <Link href={`/~/chat/${chat.id}`} className="w-full truncate">
                  <span className="w-48 truncate">{chat.messages[0].content}</span>
                </Link>
              </SidebarMenuButton>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'md:opacity-0 group-hover:opacity-100 data-[state=open]:opacity-100'}`}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" sideOffset={5} align="start">
                  <DropdownMenuItem onClick={() => handleDeleteChat(chat.id, router)}>
                    Delete Chat
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          )
        })}
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
