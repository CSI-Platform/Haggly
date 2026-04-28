import { describe, expect, it, vi } from 'vitest'
import { createModelClient, MissingModelConfigError, ModelRequestError } from './modelClient'

describe('createModelClient', () => {
  it('throws a clear configuration error when no provider is configured', () => {
    expect(() => createModelClient({ env: {}, fetchImpl: vi.fn() })).toThrow(
      MissingModelConfigError,
    )
  })

  it('calls the OpenAI Responses API with server-side credentials', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ output_text: 'OpenAI reply' }),
    })

    const client = createModelClient({
      env: {
        AI_PROVIDER: 'openai',
        OPENAI_API_KEY: 'openai-secret',
        OPENAI_MODEL: 'test-openai-model',
      },
      fetchImpl,
    })

    await expect(client.createReply({ system: 'system prompt', user: 'user prompt' })).resolves.toBe(
      'OpenAI reply',
    )

    const [url, options] = fetchImpl.mock.calls[0]
    expect(url).toBe('https://api.openai.com/v1/responses')
    expect(options.headers.Authorization).toBe('Bearer openai-secret')
    expect(JSON.parse(options.body)).toMatchObject({
      model: 'test-openai-model',
      instructions: 'system prompt',
      input: 'user prompt',
    })
  })

  it('calls the Anthropic Messages API with server-side credentials', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ content: [{ type: 'text', text: 'Anthropic reply' }] }),
    })

    const client = createModelClient({
      env: {
        AI_PROVIDER: 'anthropic',
        ANTHROPIC_API_KEY: 'anthropic-secret',
        ANTHROPIC_MODEL: 'test-anthropic-model',
      },
      fetchImpl,
    })

    await expect(client.createReply({ system: 'system prompt', user: 'user prompt' })).resolves.toBe(
      'Anthropic reply',
    )

    const [url, options] = fetchImpl.mock.calls[0]
    expect(url).toBe('https://api.anthropic.com/v1/messages')
    expect(options.headers['x-api-key']).toBe('anthropic-secret')
    expect(options.headers['anthropic-version']).toBe('2023-06-01')
    expect(JSON.parse(options.body)).toMatchObject({
      model: 'test-anthropic-model',
      max_tokens: 900,
      system: 'system prompt',
      messages: [{ role: 'user', content: 'user prompt' }],
    })
  })

  it('wraps provider failures with a model request error', async () => {
    const fetchImpl = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: async () => ({ error: { message: 'bad key' } }),
    })

    const client = createModelClient({
      env: {
        AI_PROVIDER: 'openai',
        OPENAI_API_KEY: 'openai-secret',
        OPENAI_MODEL: 'test-openai-model',
      },
      fetchImpl,
    })

    await expect(client.createReply({ system: 'system', user: 'user' })).rejects.toThrow(
      ModelRequestError,
    )
  })
})
