import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { generateMessages } from './messageGenerator'

describe('generateMessages', () => {
  beforeEach(() => {
    vi.spyOn(Math, 'random').mockReturnValue(0)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns three responses with the expected tones and emojis', () => {
    const result = generateMessages({
      item: 'gaming chair',
      askingPrice: 200,
      theirOffer: 100,
    })
    expect(result).toHaveLength(3)
    expect(result[0]).toMatchObject({ tone: 'Friendly', emoji: '😊' })
    expect(result[1]).toMatchObject({ tone: 'Firm', emoji: '💪' })
    expect(result[2]).toMatchObject({ tone: 'Casual', emoji: '✌️' })
  })

  describe('offer classification', () => {
    it('classifies an offer below 50% of asking as a lowball', () => {
      const result = generateMessages({
        item: 'gaming chair',
        askingPrice: 200,
        theirOffer: 50,
      })
      expect(result[0].description).toBe('Polite but redirects to a reasonable price')
    })

    it('classifies an offer between 50% and 75% as counter territory', () => {
      const result = generateMessages({
        item: 'gaming chair',
        askingPrice: 200,
        theirOffer: 130,
      })
      expect(result[0].description).toBe('Warm counter-offer that invites collaboration')
    })

    it('classifies an offer at 75% or higher of asking as a close call', () => {
      const result = generateMessages({
        item: 'gaming chair',
        askingPrice: 200,
        theirOffer: 170,
      })
      expect(result[0].description).toBe('Encouraging them to close the gap')
    })

    it('treats an offer at or above the user minimum as acceptable', () => {
      const result = generateMessages({
        item: 'gaming chair',
        askingPrice: 200,
        theirOffer: 150,
        minimumPrice: 140,
      })
      expect(result[0].description).toBe('Enthusiastic acceptance, good vibes')
    })

    it('treats an offer at or above asking as a full accept', () => {
      const result = generateMessages({
        item: 'gaming chair',
        askingPrice: 200,
        theirOffer: 200,
      })
      expect(result[0].description).toBe('Grateful and excited to complete the sale')
    })
  })

  describe('counter-offer math', () => {
    it('counters at the higher of midpoint or 85% of asking when no minimum is set', () => {
      // asking=100, offer=30 → midpoint=65, 85%=85 → counter=$85
      const result = generateMessages({
        item: 'gaming chair',
        askingPrice: 100,
        theirOffer: 30,
      })
      expect(result[0].message).toContain('$85')
    })

    it('never counters below the user minimum when one is set', () => {
      // asking=200, offer=80, minimum=150 → midpoint=140, max(140, 150)=150 → counter=$150
      const result = generateMessages({
        item: 'gaming chair',
        askingPrice: 200,
        theirOffer: 80,
        minimumPrice: 150,
      })
      expect(result[0].message).toContain('$150')
    })
  })
})
