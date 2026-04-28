import { useState } from 'react'
import Surface from '../../components/ui/Surface'
import { createInitialMessages, createMockAssistantReply } from './mockAssistant'
import ChatComposer from './ChatComposer'
import ChatMessage from './ChatMessage'

function ChatPanel({ conversation, mode, onConversationChange, onCopy }) {
  const activeMode = conversation?.mode ?? mode
  const [messages, setMessages] = useState(() => conversation?.messages ?? createInitialMessages(activeMode))
  const [conversationId, setConversationId] = useState(() => conversation?.id ?? `conversation-${Date.now()}`)
  const [conversationStatus, setConversationStatus] = useState(() => conversation?.status ?? 'active')
  const [conversationCreatedAt, setConversationCreatedAt] = useState(() => conversation?.createdAt ?? Date.now())
  const [isReplying, setIsReplying] = useState(false)

  const publishMessages = (nextMessages, status = conversationStatus) => {
    const nextId = conversation?.id ?? conversationId
    const nextCreatedAt = conversation?.createdAt ?? conversationCreatedAt

    setConversationId(nextId)
    setConversationStatus(status)
    setConversationCreatedAt(nextCreatedAt)
    setMessages(nextMessages)

    onConversationChange?.({
      id: nextId,
      mode: activeMode,
      status,
      summary: nextMessages.find((message) => message.role === 'user')?.content ?? `${activeMode} negotiation`,
      messages: nextMessages,
      createdAt: nextCreatedAt,
      updatedAt: Date.now(),
    })
  }

  const handleSend = (content) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      createdAt: Date.now(),
    }

    const messagesWithUser = [...messages, userMessage]
    publishMessages(messagesWithUser)
    setIsReplying(true)

    setTimeout(() => {
      publishMessages([
        ...messagesWithUser,
        createMockAssistantReply({ mode: activeMode, message: content }),
      ])
      setIsReplying(false)
    }, 450)
  }

  const handleStatusChange = (event) => {
    publishMessages(messages, event.target.value)
  }

  return (
    <Surface className="overflow-hidden">
      <div className="flex items-start justify-between gap-4 border-b border-stone-200 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-stone-950">Negotiation chat</p>
          <p className="mt-1 text-xs text-stone-500">Mock Haggly agent for now. No API key needed.</p>
        </div>
        <label className="text-xs font-semibold text-stone-500">
          Status
          <select
            value={conversationStatus}
            onChange={handleStatusChange}
            className="ml-2 rounded-md border border-stone-200 bg-white px-2 py-1 text-xs font-semibold text-stone-700 focus:border-primary-500 focus:outline-none"
          >
            <option value="active">Active</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
            <option value="expired">Expired</option>
          </select>
        </label>
      </div>

      <div className="max-h-[520px] min-h-[360px] space-y-4 overflow-y-auto bg-stone-50/70 p-4">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onCopy={() => onCopy('Copied to clipboard!')}
          />
        ))}

        {isReplying && (
          <div className="inline-flex rounded-full border border-primary-100 bg-white px-3 py-2 text-sm font-medium text-primary-800 shadow-sm shadow-stone-900/5">
            Haggly is drafting...
          </div>
        )}
      </div>

      <ChatComposer disabled={isReplying} onSend={handleSend} />
    </Surface>
  )
}

export default ChatPanel
