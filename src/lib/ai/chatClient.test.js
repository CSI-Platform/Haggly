import { describe, expect, it, vi } from 'vitest'
import { isApiChatEnabled, requestAssistantReply } from './chatClient'

describe('chatClient', () => {
  it('uses mock mode unless API mode is explicitly enabled', () => {
    expect(isApiChatEnabled({})).toBe(false)
    expect(isApiChatEnabled({ VITE_HAGGLY_CHAT_MODE: 'api' })).toBe(true)
  })

  it('calls the local chat API and returns an assistant message', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'API reply', provider: 'openai' }),
    })

    await expect(
      requestAssistantReply({
        mode: 'seller',
        message: 'They offered $80.',
        messages: [{ role: 'user', content: 'They offered $80.' }],
        fetchImpl,
      }),
    ).resolves.toMatchObject({
      role: 'assistant',
      content: 'API reply',
      provider: 'openai',
    })

    expect(fetchImpl).toHaveBeenCalledWith(
      '/api/chat',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }),
    )
  })
})
