import { Button } from '@/components/ui/button'
import { SignInButton, SignUpButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Link from 'next/link'
import { Splash } from '@/components/theme/splash'

export async function Landing() {
  const { userId } = await auth()

  return (
    <div className="flex mx-auto items-center justify-center h-screen">
      <Splash>
        {userId ? (
          <Button size="lg" asChild>
            <Link href="/~">Go to Dashboard</Link>
          </Button>
        ) : (
          <>
            <SignInButton mode="modal">
              <Button size="lg" className="mr-2">
                Sign In
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="outline" size="lg" className="ml-2">
                Sign Up
              </Button>
            </SignUpButton>
          </>
        )}
      </Splash>
    </div>
  )
}
