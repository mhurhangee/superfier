"use client";

import { Sidebar, SidebarHeader, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import OrganizationSwitcherThemed from "@/components/theme/organization-switcher";
import UserButtonThemed from "@/components/theme/user-button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { BotMessageSquare, Home } from "lucide-react";
import { usePathname } from "next/navigation";

export default function DashSidebar() {
    const pathname = usePathname();
    return (
        <Sidebar variant="floating">
            <SidebarHeader>
                <OrganizationSwitcherThemed />
            </SidebarHeader>
            <ScrollArea className="flex-1">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === '/~'}>
                                    <Link href={`/~`} className="w-full">
                                        <Home className="h-4 w-4 mr-2" />
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild isActive={pathname === '/~/chat'}>
                                    <Link href={`/~/chat`} className="w-full">
                                        <BotMessageSquare className="h-4 w-4 mr-2" />
                                        <span>Chat</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </ScrollArea>
            <SidebarFooter className="flex-none">
                <UserButtonThemed />
            </SidebarFooter>
        </Sidebar>
    );
}