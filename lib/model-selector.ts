import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { Model } from '@/components/providers/chat-settings'

export const modelSelector = (model: Model, creativity: string, responseLength: string) => {
  let selectedModel
  let selectedTemperature
  let selectedMaxTokens
  switch (model) {
    case 'gpt-4o-mini':
      selectedModel = openai.responses('gpt-4o-mini')
      break
    case 'gpt-4o':
      selectedModel = openai.responses('gpt-4o')
      break
    case 'claude':
      selectedModel = anthropic('claude-3-7-sonnet-20250219')
      break
    default:
      selectedModel = openai.responses('gpt-4o-mini')
  }

  switch (creativity) {
    case 'low':
      selectedTemperature = 0.2
      break
    case 'mid':
      selectedTemperature = 0.5
      break
    case 'high':
      selectedTemperature = 0.8
      break
    default:
      selectedTemperature = 0.6
  }

  switch (responseLength) {
    case 'short':
      selectedMaxTokens = 128
      break
    case 'balanced':
      selectedMaxTokens = 512
      break
    case 'detailed':
      selectedMaxTokens = 1024
      break
    default:
      selectedMaxTokens = 512
  }

  return { selectedModel, selectedTemperature, selectedMaxTokens }
}
