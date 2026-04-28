import { buildNegotiationContext } from '../../features/negotiation/negotiationContext'
import { assembleHagglyPrompt } from '../prompts/promptAssembler'

function extractPriceAfterLabel(text, labels) {
  for (const label of labels) {
    const pattern = new RegExp(`${label}\\D{0,40}\\$?([0-9][0-9,.]*)`, 'i')
    const match = text.match(pattern)

    if (match) {
      return Number(match[1].replace(/,/g, ''))
    }
  }

  return null
}

function extractPrices(text) {
  const prices = [...text.matchAll(/\$([0-9][0-9,.]*)/g)].map((match) =>
    Number(match[1].replace(/,/g, '')),
  )

  return {
    askingPrice:
      extractPriceAfterLabel(text, ['asking', 'listed', 'price', 'selling', 'buying']) ??
      prices[0] ??
      null,
    theirOffer:
      extractPriceAfterLabel(text, ['offer', 'offered', 'they said', 'want to offer']) ??
      prices[1] ??
      null,
    minimumPrice:
      extractPriceAfterLabel(text, ['minimum', 'lowest', 'bottom', 'would take']) ?? null,
  }
}

function extractItem(text) {
  const itemPatterns = [
    /(?:selling|buying|negotiating|looking at)\s+(?:a|an|the)?\s*([^,.]+?)(?:\s+for|\s+listed|\s+asking|,|\.|$)/i,
    /(?:item is|it's|it is)\s+(?:a|an|the)?\s*([^,.]+?)(?:,|\.|$)/i,
  ]

  for (const pattern of itemPatterns) {
    const match = text.match(pattern)

    if (match?.[1]) {
      return match[1].trim()
    }
  }

  return 'item'
}

function normalizeConversation(messages) {
  if (!Array.isArray(messages)) {
    return []
  }

  return messages
    .filter((message) => ['assistant', 'user'].includes(message.role) && message.content)
    .slice(-8)
    .map((message) => ({
      role: message.role,
      content: String(message.content),
    }))
}

export function createChatPrompt({ mode = 'seller', message = '', messages = [] } = {}) {
  const prices = extractPrices(message)
  const context = buildNegotiationContext({
    mode,
    item: extractItem(message),
    ...prices,
  })

  return assembleHagglyPrompt({
    context,
    latestMessage: message,
    conversation: normalizeConversation(messages),
  })
}
