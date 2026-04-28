import { useState } from 'react'
import Surface from '../../components/ui/Surface'
import { createInitialMessages, createMockAssistantReply } from './mockAssistant'
import ChatComposer from './ChatComposer'
import ChatMessage from './ChatMessage'

function ChatPanel({ mode, onCopy }) {
  const [messages, setMessages] = useState(() => createInitialMessages(mode))
  const [isReplying, setIsReplying] = useState(false)

  const handleSend = (content) => {
    const userMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      createdAt: Date.now(),
    }

    setMessages((currentMessages) => [...currentMessages, userMessage])
    setIsReplying(true)

    setTimeout(() => {
      setMessages((currentMessages) => [
        ...currentMessages,
        createMockAssistantReply({ mode, message: content }),
      ])
      setIsReplying(false)
    }, 450)
  }

  return (
    <Surface className="overflow-hidden">
      <div className="border-b border-stone-200 px-4 py-3">
        <p className="text-sm font-semibold text-stone-950">Negotiation chat</p>
        <p className="mt-1 text-xs text-stone-500">Mock Haggly agent for now. No API key needed.</p>
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
