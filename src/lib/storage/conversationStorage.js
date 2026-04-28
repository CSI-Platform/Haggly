const STORAGE_KEY = 'haggly:v2:conversations'
const ALLOWED_STATUSES = new Set(['active', 'accepted', 'declined', 'expired'])

function isBrowserStorageAvailable() {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

function parseConversations(rawValue) {
  if (!rawValue) {
    return []
  }

  try {
    const parsed = JSON.parse(rawValue)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function readConversations() {
  if (!isBrowserStorageAvailable()) {
    return []
  }

  return parseConversations(window.localStorage.getItem(STORAGE_KEY))
}

function writeConversations(conversations) {
  if (!isBrowserStorageAvailable()) {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(conversations))
}

export function getStoredConversations() {
  return readConversations()
    .filter((conversation) => conversation?.id && conversation?.mode && Array.isArray(conversation?.messages))
    .sort((a, b) => b.updatedAt - a.updatedAt)
}

export function saveConversation(conversation) {
  const existingConversations = readConversations()
  const nextConversation = {
    ...conversation,
    status: ALLOWED_STATUSES.has(conversation.status) ? conversation.status : 'active',
    updatedAt: Date.now(),
  }

  const withoutCurrent = existingConversations.filter((item) => item.id !== nextConversation.id)
  writeConversations([nextConversation, ...withoutCurrent])

  return nextConversation
}

export function clearStoredConversations() {
  if (!isBrowserStorageAvailable()) {
    return
  }

  window.localStorage.removeItem(STORAGE_KEY)
}
