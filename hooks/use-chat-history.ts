import useSWR from 'swr'
import { fetcher } from '@/lib/utils'

export const useChatHistory = () => {
  const { data: chats = [], error, isLoading } = useSWR('/api/chat/history', fetcher)

  return { chats, error, isLoading }
}
