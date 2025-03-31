import { Message } from "ai"

export interface Chat {
    id: string
    messages: Message[]
    updatedAt: string
}

export const categorizeChats = (chats: Chat[]) => {
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