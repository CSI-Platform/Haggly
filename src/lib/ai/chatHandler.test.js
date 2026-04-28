import { describe, expect, it, vi } from 'vitest'
import { handleChatRequest } from './chatHandler'

describe('handleChatRequest', () => {
  it('rejects non-POST requests', async () => {
    await expect(handleChatRequest({ method: 'GET' })).resolves.toMatchObject({
      status: 405,
      body: { error: 'Method not allowed' },
    })
  })

  it('returns a clear developer error when model config is missing', async () => {
    await expect(
      handleChatRequest({
        method: 'POST',
        body: { mode: 'seller', message: 'They offered $80.' },
        env: {},
        fetchImpl: vi.fn(),
      }),
    ).resolves.toMatchObject({
      status: 500,
      body: {
        code: 'missing_model_config',
      },
    })
  })

  it('returns an assistant message from the configured model provider', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ output_text: 'Current read: hold your price.' }),
    })

    await expect(
      handleChatRequest({
        method: 'POST',
        body: {
          mode: 'seller',
          message: "I'm selling a chair for $200 and they offered $100.",
          messages: [{ role: 'user', content: "I'm selling a chair." }],
        },
        env: {
          AI_PROVIDER: 'openai',
          OPENAI_API_KEY: 'openai-secret',
          OPENAI_MODEL: 'test-openai-model',
        },
        fetchImpl,
      }),
    ).resolves.toMatchObject({
      status: 200,
      body: {
        message: 'Current read: hold your price.',
        provider: 'openai',
        playbookIds: ['core-negotiation-agent', 'seller-marketplace'],
      },
    })
  })
})
