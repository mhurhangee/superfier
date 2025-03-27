import OrganizationListThemed from '@/components/theme/organization-list'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Splash } from '@/components/theme/splash'

export default async function OrgsPage() {
  const { orgId } = await auth()

  // If user has an active organization, redirect to the dashboard
  if (orgId) {
    redirect(`/~`)
  }

  return (
    <Splash description="Select or create an organization to get started">
      <OrganizationListThemed />
    </Splash>
  )
}
