import DashSidebar from '@/components/layout/DashSidebar'
import { SidebarInset } from '@/components/ui/sidebar'

export default function OrgsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DashSidebar />
      <SidebarInset>{children}</SidebarInset>
    </>
  )
}
