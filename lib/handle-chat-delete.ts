import { toast } from 'sonner'

export const handleDeleteChat = async (chatId: string) => {
  try {
    const response = await fetch(`/api/chat/delete/${chatId}`, {
      method: 'DELETE',
    })

    if (response.ok) {
      toast.success('Chat deleted successfully')
      // Redirect to chat page
      // Use window.location instead of useRouter hook
      window.location.href = '/~/chat'
    } else {
      toast.error('Failed to delete chat')
    }
  } catch (error) {
    console.error('Error deleting chat:', error)
    toast.error('An error occurred while deleting the chat')
  }
}
