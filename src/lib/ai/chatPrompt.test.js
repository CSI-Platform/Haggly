import { describe, expect, it } from 'vitest'
import { createChatPrompt } from './chatPrompt'

describe('createChatPrompt', () => {
  it('builds structured prompt parts from the latest seller message', () => {
    const prompt = createChatPrompt({
      mode: 'seller',
      message:
        "I'm selling a gaming chair for $200. They offered $80. I would take $160 if they pick up tonight.",
      messages: [
        { role: 'assistant', content: 'What is your minimum?' },
        { role: 'user', content: 'I would take $160.' },
      ],
    })

    expect(prompt.playbookIds).toEqual(['core-negotiation-agent', 'seller-marketplace'])
    expect(prompt.system).toContain('Do not behave like a script generator')
    expect(prompt.user).toContain('"mode": "seller"')
    expect(prompt.user).toContain('"offerType": "lowball"')
    expect(prompt.user).toContain('"minimumPrice": 160')
    expect(prompt.user).toContain('pick up tonight')
  })
})
