'use client'

import { Sidebar, SidebarHeader, SidebarFooter } from '@/components/ui/sidebar'
import OrganizationSwitcherThemed from '@/components/theme/organization-switcher'
import UserButtonThemed from '@/components/theme/user-button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { SidebarMain } from './sidebar-main'

export default function DashSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <OrganizationSwitcherThemed />
      </SidebarHeader>
      <ScrollArea className="flex-1 overflow-y-auto">
        <SidebarMain />
      </ScrollArea>
      <SidebarFooter className="flex-none">
        <UserButtonThemed />
      </SidebarFooter>
    </Sidebar>
  )
}
