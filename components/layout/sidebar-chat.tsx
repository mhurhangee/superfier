import { SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar'
import Link from 'next/link'
import { BotMessageSquare, Plus } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function SidebarChat() {
  const pathname = usePathname()

  if (!pathname.startsWith('/~/chat')) {
    return (
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/~/chat`} className="w-full">
            <BotMessageSquare className="h-4 w-4 mr-2" />
            <span>Chat</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    )
  }

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton asChild isActive={pathname.startsWith('/~/chat')}>
          <Link href={`/~/chat`} className="w-full">
            <BotMessageSquare className="h-4 w-4 mr-2" />
            <span>Chat</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={`/~/chat`} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            <span>New chat</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  )
}
