import { Skeleton } from '@/components/ui/skeleton';
import { OrganizationList } from '@clerk/nextjs';

export default function OrganizationListThemed() {
  return (
    <OrganizationList
      hidePersonal={true}
      fallback={
        <div className="space-y-3">
          {/* Organization card skeleton */}
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center space-x-4 rounded-lg border p-4">
              <Skeleton className="h-12 w-12 rounded-lg" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-3 w-[160px]" />
              </div>
            </div>
          ))}
          {/* Create org button skeleton */}
          <div className="mt-4">
            <Skeleton className="h-10 w-full rounded-lg" />
          </div>
        </div>
      }
    />
  );
}