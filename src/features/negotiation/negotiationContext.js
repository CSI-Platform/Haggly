export const OFFER_TYPES = {
  unknown: 'unknown',
  lowball: 'lowball',
  counter: 'counter',
  close: 'close',
  acceptable: 'acceptable',
  accept: 'accept',
}

function normalizeMode(mode) {
  return mode === 'buyer' ? 'buyer' : 'seller'
}

function normalizePrice(price) {
  if (price === null || price === undefined || price === '') {
    return null
  }

  const value = typeof price === 'string' ? Number(price.replace(/[$,]/g, '')) : Number(price)
  return Number.isFinite(value) && value >= 0 ? value : null
}

export function formatPrice(price) {
  const value = normalizePrice(price)
  if (value === null) {
    return ''
  }

  return value % 1 === 0 ? `$${value}` : `$${value.toFixed(2)}`
}

export function classifyOffer({ askingPrice, theirOffer, minimumPrice } = {}) {
  const asking = normalizePrice(askingPrice)
  const offer = normalizePrice(theirOffer)
  const minimum = normalizePrice(minimumPrice)

  if (!asking || offer === null) {
    return OFFER_TYPES.unknown
  }

  if (offer >= asking) {
    return OFFER_TYPES.accept
  }

  if (minimum !== null && offer >= minimum) {
    return OFFER_TYPES.acceptable
  }

  const offerPercentage = (offer / asking) * 100

  if (offerPercentage < 50) {
    return OFFER_TYPES.lowball
  }

  if (offerPercentage < 75) {
    return OFFER_TYPES.counter
  }

  return OFFER_TYPES.close
}

export function calculateCounterOffer({ askingPrice, theirOffer, minimumPrice } = {}) {
  const asking = normalizePrice(askingPrice)
  const offer = normalizePrice(theirOffer)
  const minimum = normalizePrice(minimumPrice)

  if (!asking || offer === null) {
    return null
  }

  const midpoint = Math.round((offer + asking) / 2)

  if (minimum !== null) {
    return Math.max(midpoint, minimum)
  }

  return Math.max(midpoint, Math.round(asking * 0.85))
}

function getPercentOfAsking(askingPrice, theirOffer) {
  if (!askingPrice || theirOffer === null) {
    return null
  }

  return Math.round((theirOffer / askingPrice) * 100)
}

function getMissingFields({ item, askingPrice, theirOffer }) {
  return [
    !item ? 'item' : null,
    !askingPrice ? 'askingPrice' : null,
    theirOffer === null ? 'theirOffer' : null,
  ].filter(Boolean)
}

function getNextMove(offerType) {
  if (offerType === OFFER_TYPES.accept || offerType === OFFER_TYPES.acceptable) {
    return 'accept-or-tighten-logistics'
  }

  if (offerType === OFFER_TYPES.close) {
    return 'counter-lightly'
  }

  if (offerType === OFFER_TYPES.counter || offerType === OFFER_TYPES.lowball) {
    return 'test-seriousness-then-counter'
  }

  return 'gather-context'
}

export function buildNegotiationContext({
  mode = 'seller',
  item,
  askingPrice,
  theirOffer,
  minimumPrice,
} = {}) {
  const normalizedItem = item?.trim() || 'item'
  const normalizedAskingPrice = normalizePrice(askingPrice)
  const normalizedTheirOffer = normalizePrice(theirOffer)
  const normalizedMinimumPrice = normalizePrice(minimumPrice)
  const offerType = classifyOffer({
    askingPrice: normalizedAskingPrice,
    theirOffer: normalizedTheirOffer,
    minimumPrice: normalizedMinimumPrice,
  })

  return {
    mode: normalizeMode(mode),
    item: normalizedItem,
    offerType,
    prices: {
      askingPrice: normalizedAskingPrice,
      theirOffer: normalizedTheirOffer,
      minimumPrice: normalizedMinimumPrice,
      counterOffer: calculateCounterOffer({
        askingPrice: normalizedAskingPrice,
        theirOffer: normalizedTheirOffer,
        minimumPrice: normalizedMinimumPrice,
      }),
      percentOfAsking: getPercentOfAsking(normalizedAskingPrice, normalizedTheirOffer),
    },
    missingFields: getMissingFields({
      item,
      askingPrice: normalizedAskingPrice,
      theirOffer: normalizedTheirOffer,
    }),
    nextMove: getNextMove(offerType),
  }
}
