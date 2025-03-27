import { Logo } from '@/components/theme/logo'
import { Icon } from '@/components/theme/icon'
import { ReactNode } from 'react'

export async function Splash({
  children,
  description,
}: {
  children: ReactNode
  description?: string
}) {
  return (
    <main className="container flex min-h-screen flex-col items-center mx-auto justify-center max-w-5xl text-center gap-6">
      <h1 className="text-5xl font-bold tracking-tighter">
        <Icon className="inline-block size-12 mr-2" />
        <Logo />
      </h1>

      <p className="text-lg text-muted-foreground animate-pulse">
        {description || 'AI-tools for small-to-medium enterprises in the UK'}
      </p>

      <div className="w-full max-w-5xl mt-4 flex justify-center">{children}</div>
    </main>
  )
}
