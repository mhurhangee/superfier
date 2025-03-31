import { SidebarMenuItem, SidebarMenuButton, SidebarGroup, SidebarGroupLabel, SidebarGroupContent } from '@/components/ui/sidebar'
import { BotMessageSquare, ChevronRight } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { useChatHistory } from '@/hooks/use-chat-history'
import { NewChatButton } from './sidebar-new-chat-button'
import Link from 'next/link'
import { Message } from 'ai'

interface Chat {
    id: string
    messages: Message[]
}

export function SidebarChat() {
    const pathname = usePathname()

    const { chats, isLoading } = useChatHistory()

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
                <SidebarGroupLabel>
                    <span>Previous chats</span>
                </SidebarGroupLabel>
                <SidebarGroupContent>
                    {isLoading ? (
                        <SidebarMenuItem>
                            <SidebarMenuButton>
                                <span>Loading...</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>

                    ) : chats.map((chat: Chat) => (
                        <SidebarMenuItem key={chat.id}>
                            <SidebarMenuButton asChild>
                                <Link href={`/~/chat/${chat.id}`} className="w-full truncate">
                                    <span className="w-48 truncate">{chat.messages[0].content}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarGroupContent>
                </CollapsibleContent>
            </SidebarGroup>
        </Collapsible>
    )
}