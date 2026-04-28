import { describe, expect, it } from 'vitest'
import {
  buildNegotiationContext,
  calculateCounterOffer,
  classifyOffer,
  formatPrice,
} from './negotiationContext'

describe('classifyOffer', () => {
  it('classifies an offer below 50% of asking as a lowball', () => {
    expect(classifyOffer({ askingPrice: 200, theirOffer: 50 })).toBe('lowball')
  })

  it('classifies an offer between 50% and 75% as counter territory', () => {
    expect(classifyOffer({ askingPrice: 200, theirOffer: 130 })).toBe('counter')
  })

  it('classifies an offer at 75% or higher of asking as close', () => {
    expect(classifyOffer({ askingPrice: 200, theirOffer: 170 })).toBe('close')
  })

  it('treats an offer at or above the minimum as acceptable before countering', () => {
    expect(classifyOffer({ askingPrice: 200, theirOffer: 150, minimumPrice: 140 })).toBe(
      'acceptable',
    )
  })

  it('treats an offer at or above asking as a full accept', () => {
    expect(classifyOffer({ askingPrice: 200, theirOffer: 200 })).toBe('accept')
  })
})

describe('calculateCounterOffer', () => {
  it('counters at the higher of midpoint or 85% of asking when no minimum is set', () => {
    expect(calculateCounterOffer({ askingPrice: 100, theirOffer: 30 })).toBe(85)
  })

  it('never counters below the minimum when one is set', () => {
    expect(calculateCounterOffer({ askingPrice: 200, theirOffer: 80, minimumPrice: 150 })).toBe(
      150,
    )
  })
})

describe('formatPrice', () => {
  it('formats whole-dollar and decimal prices consistently', () => {
    expect(formatPrice(85)).toBe('$85')
    expect(formatPrice(85.5)).toBe('$85.50')
  })
})

describe('buildNegotiationContext', () => {
  it('creates structured seller context for future prompt assembly', () => {
    const context = buildNegotiationContext({
      mode: 'seller',
      item: ' gaming chair ',
      askingPrice: 200,
      theirOffer: 130,
      minimumPrice: 120,
    })

    expect(context).toMatchObject({
      mode: 'seller',
      item: 'gaming chair',
      offerType: 'acceptable',
      prices: {
        askingPrice: 200,
        theirOffer: 130,
        minimumPrice: 120,
        counterOffer: 165,
        percentOfAsking: 65,
      },
      nextMove: 'accept-or-tighten-logistics',
    })
  })

  it('keeps incomplete buyer context usable without fake price assumptions', () => {
    const context = buildNegotiationContext({
      mode: 'buyer',
      item: 'used pickup',
      askingPrice: 12000,
    })

    expect(context).toMatchObject({
      mode: 'buyer',
      item: 'used pickup',
      offerType: 'unknown',
      prices: {
        askingPrice: 12000,
        theirOffer: null,
        minimumPrice: null,
        counterOffer: null,
        percentOfAsking: null,
      },
      missingFields: ['theirOffer'],
      nextMove: 'gather-context',
    })
  })
})
