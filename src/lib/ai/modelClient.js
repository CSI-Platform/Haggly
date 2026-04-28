export class MissingModelConfigError extends Error {
  constructor(message) {
    super(message)
    this.name = 'MissingModelConfigError'
    this.code = 'missing_model_config'
  }
}

export class ModelRequestError extends Error {
  constructor(message, { provider, status } = {}) {
    super(message)
    this.name = 'ModelRequestError'
    this.code = 'model_request_failed'
    this.provider = provider
    this.status = status
  }
}

function requireEnv(env, key, helpText) {
  const value = env[key]?.trim()

  if (!value) {
    throw new MissingModelConfigError(`${key} is required. ${helpText}`)
  }

  return value
}

function getMaxTokens(env) {
  const value = Number(env.AI_MAX_TOKENS ?? 900)
  return Number.isFinite(value) && value > 0 ? Math.round(value) : 900
}

async function readJson(response) {
  try {
    return await response.json()
  } catch (_error) {
    return null
  }
}

function getProviderError(data) {
  return data?.error?.message ?? data?.message ?? 'Unknown provider error'
}

function extractOpenAIText(data) {
  if (typeof data?.output_text === 'string' && data.output_text.trim()) {
    return data.output_text.trim()
  }

  const text = data?.output
    ?.flatMap((item) => item.content ?? [])
    .map((content) => content.text)
    .filter(Boolean)
    .join('\n')
    .trim()

  return text || null
}

function extractAnthropicText(data) {
  const text = data?.content
    ?.filter((content) => content.type === 'text')
    .map((content) => content.text)
    .join('\n')
    .trim()

  return text || null
}

function createOpenAIClient({ env, fetchImpl }) {
  const apiKey = requireEnv(
    env,
    'OPENAI_API_KEY',
    'Set OPENAI_API_KEY on the server or Vercel project.',
  )
  const model = requireEnv(env, 'OPENAI_MODEL', 'Set OPENAI_MODEL to the model you want Haggly to use.')

  return {
    provider: 'openai',
    async createReply(prompt) {
      const response = await fetchImpl('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          instructions: prompt.system,
          input: prompt.user,
          max_output_tokens: getMaxTokens(env),
        }),
      })
      const data = await readJson(response)

      if (!response.ok) {
        throw new ModelRequestError(`OpenAI request failed: ${getProviderError(data)}`, {
          provider: 'openai',
          status: response.status,
        })
      }

      const text = extractOpenAIText(data)
      if (!text) {
        throw new ModelRequestError('OpenAI response did not include text output.', {
          provider: 'openai',
          status: response.status,
        })
      }

      return text
    },
  }
}

function createAnthropicClient({ env, fetchImpl }) {
  const apiKey = requireEnv(
    env,
    'ANTHROPIC_API_KEY',
    'Set ANTHROPIC_API_KEY on the server or Vercel project.',
  )
  const model = requireEnv(
    env,
    'ANTHROPIC_MODEL',
    'Set ANTHROPIC_MODEL to the model you want Haggly to use.',
  )

  return {
    provider: 'anthropic',
    async createReply(prompt) {
      const response = await fetchImpl('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': env.ANTHROPIC_VERSION ?? '2023-06-01',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          max_tokens: getMaxTokens(env),
          system: prompt.system,
          messages: [{ role: 'user', content: prompt.user }],
        }),
      })
      const data = await readJson(response)

      if (!response.ok) {
        throw new ModelRequestError(`Anthropic request failed: ${getProviderError(data)}`, {
          provider: 'anthropic',
          status: response.status,
        })
      }

      const text = extractAnthropicText(data)
      if (!text) {
        throw new ModelRequestError('Anthropic response did not include text output.', {
          provider: 'anthropic',
          status: response.status,
        })
      }

      return text
    },
  }
}

export function createModelClient({ env = process.env, fetchImpl = fetch } = {}) {
  const provider = env.AI_PROVIDER?.trim().toLowerCase()

  if (provider === 'openai') {
    return createOpenAIClient({ env, fetchImpl })
  }

  if (provider === 'anthropic') {
    return createAnthropicClient({ env, fetchImpl })
  }

  throw new MissingModelConfigError(
    'Set AI_PROVIDER to "openai" or "anthropic", then set the matching API key and model env vars.',
  )
}
