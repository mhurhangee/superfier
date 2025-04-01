import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const handleDeleteChat = async (chatId: string, router: ReturnType<typeof useRouter>) => {
  try {
    const response = await fetch(`/api/chat/delete/${chatId}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      toast.success('Chat deleted successfully')
      // Redirect to chat page

      router.push('/~/chat')
    } else {
      toast.error('Failed to delete chat')
    }
  } catch (error) {
    console.error('Error deleting chat:', error)
    toast.error('An error occurred while deleting the chat')
  }
}
