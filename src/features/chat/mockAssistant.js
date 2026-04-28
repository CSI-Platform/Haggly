import { generateMessages } from '../../utils/messageGenerator'

function normalizeMode(mode) {
  return mode === 'buyer' ? 'buyer' : 'seller'
}

export function createInitialMessages(mode) {
  const normalizedMode = normalizeMode(mode)
  const roleLabel = normalizedMode === 'buyer' ? 'buyer' : 'seller'

  return [
    {
      id: `${normalizedMode}-assistant-welcome`,
      role: 'assistant',
      content: `Tell me what you're negotiating as the ${roleLabel}. Include the item, asking price, their offer, and the tone you want.`,
      createdAt: Date.now(),
    },
  ]
}

function extractPriceAfterLabel(text, labels) {
  for (const label of labels) {
    const pattern = new RegExp(`${label}\\D{0,20}\\$?([0-9][0-9,.]*)`, 'i')
    const match = text.match(pattern)
    if (match) {
      return Number(match[1].replace(/,/g, ''))
    }
  }

  return null
}

function extractPrices(text) {
  const prices = [...text.matchAll(/\$([0-9][0-9,.]*)/g)]
    .map((match) => Number(match[1].replace(/,/g, '')))

  return {
    askingPrice: extractPriceAfterLabel(text, ['asking', 'listed', 'price']) ?? prices[0] ?? 100,
    theirOffer: extractPriceAfterLabel(text, ['offer', 'offered', 'they said']) ?? prices[1] ?? prices[0] ?? 75,
    minimumPrice: extractPriceAfterLabel(text, ['minimum', 'lowest', 'bottom']) ?? null,
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

function formatGeneratedResponses(responses) {
  return responses
    .map((response) => `${response.tone}: ${response.message}`)
    .join('\n\n')
}

export function createMockAssistantReply({ mode, message }) {
  const normalizedMode = normalizeMode(mode)
  const { askingPrice, theirOffer, minimumPrice } = extractPrices(message)
  const item = extractItem(message)

  if (normalizedMode === 'buyer') {
    return {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      content: [
        `Start by confirming the useful details on the ${item}, then make the price conversation specific.`,
        `Ask: "What condition issues should I know about, and is ${theirOffer ? `$${theirOffer}` : 'my offer'} realistic if I can move quickly?"`,
        'Keep your next message calm, specific, and easy for the seller to answer.',
      ].join('\n\n'),
      createdAt: Date.now(),
    }
  }

  const responses = generateMessages({
    item,
    askingPrice,
    theirOffer,
    minimumPrice,
  })

  return {
    id: `assistant-${Date.now()}`,
    role: 'assistant',
    content: formatGeneratedResponses(responses),
    createdAt: Date.now(),
  }
}
