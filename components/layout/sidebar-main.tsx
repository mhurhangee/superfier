import { usePathname } from 'next/navigation'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'
import Link from 'next/link'
import { Home } from 'lucide-react'
import { SidebarChat } from './sidebar-chat'

export function SidebarMain() {
  const pathname = usePathname()
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem className="ml-2 mr-2">
            <SidebarMenuButton asChild isActive={pathname === '/~'}>
              <Link href={`/~`} className="w-full">
                <Home className="h-4 w-4 mr-2" />
                <span>Home</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarChat />
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
