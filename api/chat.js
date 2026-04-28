import { handleChatRequest } from '../src/lib/ai/chatHandler.js'

async function readJsonBody(request) {
  if (request.body && typeof request.body === 'object' && !Buffer.isBuffer(request.body)) {
    return request.body
  }

  if (typeof request.body === 'string') {
    return JSON.parse(request.body)
  }

  if (Buffer.isBuffer(request.body)) {
    return JSON.parse(request.body.toString('utf8'))
  }

  const chunks = []
  for await (const chunk of request) {
    chunks.push(chunk)
  }

  if (!chunks.length) {
    return {}
  }

  return JSON.parse(Buffer.concat(chunks).toString('utf8'))
}

export default async function handler(request, response) {
  try {
    const body = request.method === 'POST' ? await readJsonBody(request) : undefined
    const result = await handleChatRequest({
      method: request.method,
      body,
    })

    response.status(result.status).json(result.body)
  } catch (_error) {
    response.status(400).json({
      code: 'invalid_json',
      error: 'Request body must be valid JSON.',
    })
  }
}
