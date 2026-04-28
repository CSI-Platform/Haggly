import { readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../../..')

const PLAYBOOKS = [
  {
    id: 'core-negotiation-agent',
    path: 'prompts/playbooks/core-negotiation-agent.md',
  },
  {
    id: 'seller-marketplace',
    path: 'prompts/playbooks/seller-marketplace.md',
  },
  {
    id: 'buyer-car-dealership',
    path: 'prompts/playbooks/buyer-car-dealership.md',
  },
  {
    id: 'buyer-car-private-seller',
    path: 'prompts/playbooks/buyer-car-private-seller.md',
  },
]

const playbookCache = new Map()

function getPlaybookById(id) {
  const playbook = PLAYBOOKS.find((candidate) => candidate.id === id)

  if (!playbook) {
    throw new Error(`Unknown playbook: ${id}`)
  }

  if (!playbookCache.has(id)) {
    playbookCache.set(id, {
      ...playbook,
      content: readFileSync(resolve(repoRoot, playbook.path), 'utf8').trim(),
    })
  }

  return playbookCache.get(id)
}

function includesAny(text, terms) {
  return terms.some((term) => text.includes(term))
}

function getSelectionText({ context, latestMessage }) {
  return `${context?.item ?? ''} ${latestMessage ?? ''}`.toLowerCase()
}

function getBuyerPlaybookId(selectionText) {
  const isDealership = includesAny(selectionText, [
    'dealer',
    'dealership',
    'out-the-door',
    'otd',
    'manager',
    'financing',
  ])

  if (isDealership) {
    return 'buyer-car-dealership'
  }

  const isPrivateCarSale = includesAny(selectionText, [
    'car',
    'vehicle',
    'truck',
    'honda',
    'civic',
    'private seller',
    'owner',
  ])

  if (isPrivateCarSale) {
    return 'buyer-car-private-seller'
  }

  return null
}

function formatConversation(conversation) {
  if (!conversation?.length) {
    return '(none)'
  }

  return conversation
    .map((message) => `${message.role}: ${message.content}`)
    .join('\n')
}

export function selectPlaybooks({ context = {}, latestMessage = '' } = {}) {
  const selectedIds = ['core-negotiation-agent']

  if (context.mode === 'buyer') {
    const buyerPlaybookId = getBuyerPlaybookId(getSelectionText({ context, latestMessage }))

    if (buyerPlaybookId) {
      selectedIds.push(buyerPlaybookId)
    }
  } else {
    selectedIds.push('seller-marketplace')
  }

  return selectedIds.map(getPlaybookById)
}

export function assembleHagglyPrompt({ context = {}, latestMessage = '', conversation = [] } = {}) {
  const playbooks = selectPlaybooks({ context, latestMessage })

  return {
    playbookIds: playbooks.map((playbook) => playbook.id),
    system: [
      'You are Haggly, an agentic AI negotiation assistant.',
      'Do not behave like a script generator. Diagnose first, ask for missing context when needed, and draft only when drafting is the right next move.',
      'Use these playbooks as guidance, not as canned copy.',
      playbooks.map((playbook) => playbook.content).join('\n\n'),
    ].join('\n\n'),
    user: [
      'Negotiation context JSON:',
      JSON.stringify(context, null, 2),
      'Latest user message:',
      latestMessage || '(none)',
      'Conversation history:',
      formatConversation(conversation),
    ].join('\n\n'),
  }
}
