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
      content: `I'm in ${roleLabel} mode. Give me the negotiation context, and I'll diagnose the leverage, identify what's missing, and recommend the next move before drafting anything.`,
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

function getOfferRead(askingPrice, theirOffer) {
  if (!askingPrice || !theirOffer) {
    return 'I do not have enough price context yet.'
  }

  const percentOfAsk = Math.round((theirOffer / askingPrice) * 100)

  if (percentOfAsk < 50) {
    return `Their offer is about ${percentOfAsk}% of asking, so treat it as a low-commitment probe until they show seriousness.`
  }

  if (percentOfAsk < 75) {
    return `Their offer is about ${percentOfAsk}% of asking, so there is room to counter without over-explaining.`
  }

  if (theirOffer < askingPrice) {
    return `Their offer is about ${percentOfAsk}% of asking, so the deal is close enough to move toward logistics.`
  }

  return 'Their offer meets or beats asking, so protect the close and move to logistics.'
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
        `Current read: you're evaluating the ${item}, but the real leverage depends on condition, seller urgency, and comparable listings.`,
        `Missing context: how long it has been listed, whether there are defects, whether the seller has other buyers, and your walk-away number.`,
        `Next move: ask one diagnostic question before negotiating price. If the answer creates leverage, then make a calm offer tied to that specific reason.`,
        `Haggly check: do you want me to probe condition, seller urgency, or final offer strategy first?`,
      ].join('\n\n'),
      createdAt: Date.now(),
    }
  }

  return {
    id: `assistant-${Date.now()}`,
    role: 'assistant',
    content: [
      `Current read: ${getOfferRead(askingPrice, theirOffer)}`,
      `Missing context: how long the ${item} has been listed, whether you have other interest, how fast you want it gone, and whether ${minimumPrice ? `$${minimumPrice}` : 'your minimum'} is firm.`,
      'Next move: do not eagerly justify the price. Test seriousness first, then counter once with a clean boundary and a simple pickup condition.',
      'Haggly check: should we optimize for fastest sale, highest price, or least back-and-forth?',
    ].join('\n\n'),
    createdAt: Date.now(),
  }
}
