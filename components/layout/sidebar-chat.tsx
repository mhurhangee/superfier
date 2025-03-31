import { SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenuAction } from '@/components/ui/sidebar'
import { BotMessageSquare, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useChatHistory } from '@/hooks/use-chat-history'
import { NewChatButton } from './sidebar-new-chat-button'
import { Separator } from '@/components/ui/separator'
import { categorizeChats } from '@/lib/categorize-chats'
import { ChatGroup } from './sidebar-chat-history-group'

export function SidebarChat() {
    const pathname = usePathname()

    const { chats, isLoading } = useChatHistory()

    const { todayChats, yesterdayChats, lastWeekChats, olderChats } = !isLoading && chats.length > 0
        ? categorizeChats(chats)
        : { todayChats: [], yesterdayChats: [], lastWeekChats: [], olderChats: [] }


    return (
        <Collapsible className="group/collapsible" defaultOpen={pathname.startsWith('/~/chat')} >
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
                            <ChatGroup chats={todayChats} label="Today" />
                            <ChatGroup chats={yesterdayChats} label="Yesterday" />
                            <ChatGroup chats={lastWeekChats} label="Last 7 Days" />
                            <ChatGroup chats={olderChats} label="Older" />
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