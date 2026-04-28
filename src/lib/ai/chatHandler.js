import { createChatPrompt } from './chatPrompt'
import { createModelClient, MissingModelConfigError, ModelRequestError } from './modelClient'

function getLatestMessage(body) {
  return typeof body?.message === 'string' ? body.message.trim() : ''
}

function getErrorResponse(error) {
  if (error instanceof MissingModelConfigError) {
    return {
      status: 500,
      body: {
        code: error.code,
        error: error.message,
      },
    }
  }

  if (error instanceof ModelRequestError) {
    return {
      status: 502,
      body: {
        code: error.code,
        error: error.message,
        provider: error.provider,
      },
    }
  }

  return {
    status: 500,
    body: {
      code: 'chat_api_error',
      error: 'Haggly could not create a response.',
    },
  }
}

export async function handleChatRequest({
  method,
  body,
  env = process.env,
  fetchImpl = fetch,
} = {}) {
  if (method !== 'POST') {
    return {
      status: 405,
      body: { error: 'Method not allowed' },
    }
  }

  const message = getLatestMessage(body)
  if (!message) {
    return {
      status: 400,
      body: {
        code: 'missing_message',
        error: 'Message is required.',
      },
    }
  }

  try {
    const prompt = createChatPrompt({
      mode: body?.mode,
      message,
      messages: body?.messages,
    })
    const client = createModelClient({ env, fetchImpl })
    const assistantMessage = await client.createReply(prompt)

    return {
      status: 200,
      body: {
        message: assistantMessage,
        provider: client.provider,
        playbookIds: prompt.playbookIds,
      },
    }
  } catch (error) {
    return getErrorResponse(error)
  }
}
