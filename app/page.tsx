import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { Splash } from '@/components/theme/splash'

export default async function Home() {
  const { userId } = await auth()

  return (
    <Splash>
      {userId ? (
        <Button size="lg" asChild>
          <Link href="/~">Go to Dashboard</Link>
        </Button>
      ) : (
        <>
          <SignInButton mode="modal">
            <Button size="lg" className="mr-2">Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button variant="outline" size="lg" className="ml-2">
              Sign Up
            </Button>
          </SignUpButton>
        </>
      )}
    </Splash>
  )
}
