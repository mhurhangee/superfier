import { Skeleton } from '@/components/ui/skeleton'
import { OrganizationSwitcher } from '@clerk/nextjs'

export default function OrganizationSwitcherThemed() {
  return (
    <OrganizationSwitcher
      hidePersonal={true}
      appearance={{
        elements: {
          rootBox: 'w-full',
          organizationSwitcherTrigger: `w-full flex items-center gap-2 m-2 p-2 text-foreground hover:text-foreground rounded-md`,
        },
      }}
      fallback={
        <div className="flex items-center gap-2">
          <Skeleton className="h-12 w-8 rounded-lg" />
          <Skeleton className="h-12 w-[160px]" />
        </div>
      }
    />
  )
}
