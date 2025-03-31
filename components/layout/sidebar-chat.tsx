import { SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarGroupAction } from '@/components/ui/sidebar'
import { BotMessageSquare, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useChatHistory } from '@/hooks/use-chat-history'
import { NewChatButton } from './sidebar-new-chat-button'
import Link from 'next/link'
import { Message } from 'ai'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'

interface Chat {
    id: string
    messages: Message[]
    updatedAt: string
}

export function SidebarChat() {
    const pathname = usePathname()

    const { chats, isLoading } = useChatHistory()

    const categorizeChats = (chats: Chat[]) => {
        const now = new Date()
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)
        const lastWeekStart = new Date(today)
        lastWeekStart.setDate(lastWeekStart.getDate() - 7)

        const todayChats: Chat[] = []
        const yesterdayChats: Chat[] = []
        const lastWeekChats: Chat[] = []
        const olderChats: Chat[] = []

        chats.forEach((chat) => {
            const chatDate = new Date(chat.updatedAt)
            const chatDateOnly = new Date(
                chatDate.getFullYear(),
                chatDate.getMonth(),
                chatDate.getDate()
            )

            if (chatDateOnly.getTime() === today.getTime()) {
                todayChats.push(chat)
            } else if (chatDateOnly.getTime() === yesterday.getTime()) {
                yesterdayChats.push(chat)
            } else if (chatDateOnly > lastWeekStart && chatDateOnly < yesterday) {
                lastWeekChats.push(chat)
            } else {
                olderChats.push(chat)
            }
        })

        return { todayChats, yesterdayChats, lastWeekChats, olderChats }
    }

    const { todayChats, yesterdayChats, lastWeekChats, olderChats } = !isLoading && chats.length > 0
        ? categorizeChats(chats)
        : { todayChats: [], yesterdayChats: [], lastWeekChats: [], olderChats: [] }

    const renderChatGroup = (chats: Chat[], label: string) => {
        if (chats.length === 0) return null

        return (
            <SidebarGroup>
                <SidebarGroupLabel>
                    <span>{label}</span>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    {chats.map((chat: Chat) => (
                        <SidebarMenuItem key={chat.id}>
                            <SidebarMenuButton asChild isActive={pathname === `/~/chat/${chat.id}`}>
                                <Link href={`/~/chat/${chat.id}`} className="w-full truncate">
                                    <span className="w-48 truncate">{chat.messages[0].content}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarGroupContent>
            </SidebarGroup>
        )
    }
    return (
        <Collapsible className="group/collapsible">
            <SidebarGroup>
                <CollapsibleTrigger>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild isActive={pathname.startsWith('/~/chat')}>
                            <span>
                                <BotMessageSquare className="h-4 w-4 mr-2" />
                                Chat
                                <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                            </span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <NewChatButton />
                    <Separator />
                        {isLoading ? (
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <span>Loading...</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ) : (
                            <>
                                {renderChatGroup(todayChats, "Today")}
                                {renderChatGroup(yesterdayChats, "Yesterday")}
                                {renderChatGroup(lastWeekChats, "Last 7 Days")}
                                {renderChatGroup(olderChats, "Older")}
                                {!todayChats.length && !yesterdayChats.length && !lastWeekChats.length && !olderChats.length && (
                                <SidebarGroup>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton>
                                            <span>No history ...</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </SidebarGroup>
                                )}
                            </>
                        )}
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    )
}