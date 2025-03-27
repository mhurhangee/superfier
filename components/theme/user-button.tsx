import { Skeleton } from '@/components/ui/skeleton'
import { UserButton } from '@clerk/nextjs'

export default function UserButtonThemed() {
  return (
    <UserButton
      showName
      appearance={{
        elements: {
          rootBox: 'w-full',
          userButtonTrigger: `w-full flex items-center gap-2 m-2 p-2 text-foreground hover:text-foreground rounded-md`,
          avatarBox: 'h-8 w-8',
        },
      }}
      fallback={
        <div className="flex items-center gap-2">
          <Skeleton className="h-8 w-[160px]" />
          <Skeleton className="h-8 w-8 rounded-lg" />
        </div>
      }
    />
  )
}
