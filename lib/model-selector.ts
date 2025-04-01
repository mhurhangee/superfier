import { openai } from '@ai-sdk/openai'
import { Model } from '@/components/providers/chat-settings'

export const modelSelector = (model: Model) => {
  switch (model) {
    case 'gpt-4o-mini':
      return openai.responses('gpt-4o-mini')
    case 'gpt-4o':
      return openai.responses('gpt-4o')
    default:
      return openai.responses('gpt-4o-mini')
  }
}