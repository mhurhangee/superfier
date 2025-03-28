import type { Metadata } from 'next'
import { Providers } from '@/components/providers/providers'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { getEnvironment } from '@/lib/utils'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: getEnvironment() + 'Superfier.com',
  description: 'AI-tools for small-to-medium enterprises in the UK',
  keywords: ['AI', 'GDPR', 'SME'],
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🔥</text></svg>',
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            'min-h-screen font-mono antialiased',
            geistSans.variable,
            geistMono.variable
          )}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  )
}
