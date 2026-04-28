export function isApiChatEnabled(env = import.meta.env) {
  return env?.VITE_HAGGLY_CHAT_MODE === 'api'
}

async function readResponseJson(response) {
  try {
    return await response.json()
  } catch (_error) {
    return {}
  }
}

export async function requestAssistantReply({ mode, message, messages, fetchImpl = fetch }) {
  const response = await fetchImpl('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode, message, messages }),
  })
  const data = await readResponseJson(response)

  if (!response.ok) {
    throw new Error(data.error ?? 'Haggly API request failed.')
  }

  return {
    id: `assistant-${Date.now()}`,
    role: 'assistant',
    content: data.message,
    provider: data.provider,
    playbookIds: data.playbookIds,
    createdAt: Date.now(),
  }
}
