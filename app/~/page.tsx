import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { Splash } from '@/components/theme/splash'

export default async function OrgsPage() {
  const { orgId } = await auth()

  // If user has no active organization, redirect to the organization selection page
  if (!orgId) {
    redirect(`/~/org`)
  }

  return (
    <Splash description="Welcome to Superfier">
      Select an option in the sidebar to get started!
    </Splash>
  )
}
