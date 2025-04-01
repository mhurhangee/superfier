import DashSidebar from '@/components/layout/dash-sidebar'
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar'

export default function OrgsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashSidebar />
      <SidebarInset>
        <SidebarTrigger className="mt-4 absolute" />
        {children}
      </SidebarInset>
    </>
  )
}
