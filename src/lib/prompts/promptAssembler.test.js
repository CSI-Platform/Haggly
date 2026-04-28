import { describe, expect, it } from 'vitest'
import { buildNegotiationContext } from '../../features/negotiation/negotiationContext'
import { assembleHagglyPrompt, selectPlaybooks } from './promptAssembler'

describe('selectPlaybooks', () => {
  it('selects core and seller marketplace guidance for seller context', () => {
    const context = buildNegotiationContext({
      mode: 'seller',
      item: 'gaming chair',
      askingPrice: 200,
      theirOffer: 80,
    })

    const playbooks = selectPlaybooks({
      context,
      latestMessage: 'They said they can pick up today if I take $80.',
    })

    expect(playbooks.map((playbook) => playbook.id)).toEqual([
      'core-negotiation-agent',
      'seller-marketplace',
    ])
  })

  it('selects dealership guidance for a buyer working with a dealer', () => {
    const context = buildNegotiationContext({
      mode: 'buyer',
      item: 'used Honda Civic',
      askingPrice: 18000,
    })

    const playbooks = selectPlaybooks({
      context,
      latestMessage: 'I am buying from a dealership and want the out-the-door price.',
    })

    expect(playbooks.map((playbook) => playbook.id)).toEqual([
      'core-negotiation-agent',
      'buyer-car-dealership',
    ])
  })

  it('selects private-seller car guidance for a buyer negotiating with an owner', () => {
    const context = buildNegotiationContext({
      mode: 'buyer',
      item: 'used truck',
      askingPrice: 22000,
    })

    const playbooks = selectPlaybooks({
      context,
      latestMessage: 'This is a private seller listing from the owner.',
    })

    expect(playbooks.map((playbook) => playbook.id)).toEqual([
      'core-negotiation-agent',
      'buyer-car-private-seller',
    ])
  })
})

describe('assembleHagglyPrompt', () => {
  it('assembles a prompt with playbooks and structured context without an API key', () => {
    const context = buildNegotiationContext({
      mode: 'seller',
      item: 'gaming chair',
      askingPrice: 200,
      theirOffer: 80,
      minimumPrice: 160,
    })

    const prompt = assembleHagglyPrompt({
      context,
      latestMessage: 'They offered $80 and want to pick up tonight.',
      conversation: [
        { role: 'user', content: 'I am selling a gaming chair for $200.' },
        { role: 'assistant', content: 'What is your minimum?' },
      ],
    })

    expect(prompt.playbookIds).toEqual(['core-negotiation-agent', 'seller-marketplace'])
    expect(prompt.system).toContain('You are Haggly')
    expect(prompt.system).toContain('Do not behave like a script generator')
    expect(prompt.system).toContain('## Core Negotiation Agent')
    expect(prompt.system).toContain('## Seller Marketplace')
    expect(prompt.user).toContain('"offerType": "lowball"')
    expect(prompt.user).toContain('They offered $80 and want to pick up tonight.')
    expect(prompt.user).toContain('What is your minimum?')
  })
})
