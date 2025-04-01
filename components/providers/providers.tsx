import { ThemeProvider } from '@/components/providers/theme'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import { SidebarProvider } from '@/components/ui/sidebar'
import { ChatSettingsProvider } from '@/components/providers/chat-settings'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <SidebarProvider>
        <TooltipProvider>
          <ChatSettingsProvider>
            {children}
          </ChatSettingsProvider>
          <Toaster richColors />
        </TooltipProvider>
      </SidebarProvider>
    </ThemeProvider>
  )
}
