import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { Splash } from '@/components/theme/splash';

export default async function OrgsPage() {
  const { orgId, orgSlug, sessionClaims } = await auth();
  const orgName = sessionClaims?.org_name as string;

  // If user has no active organization, redirect to the organization selection page
  if (!orgId) {
    redirect(`/~/org`);
  }

  return (
    <Splash description="Welcome to Superfier">
      {orgName} - {orgSlug}
    </Splash>
  );
}