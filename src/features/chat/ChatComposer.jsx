import { Send } from 'lucide-react'
import { useState } from 'react'
import Button from '../../components/ui/Button'

function ChatComposer({ disabled, onSend }) {
  const [draft, setDraft] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    const message = draft.trim()

    if (!message) {
      return
    }

    onSend(message)
    setDraft('')
  }

  return (
    <form onSubmit={handleSubmit} className="border-t border-stone-200 bg-white p-3">
      <div className="flex gap-2">
        <label htmlFor="chat-message" className="sr-only">
          Message Haggly
        </label>
        <textarea
          id="chat-message"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder="Paste the offer or ask what to say next..."
          rows={2}
          className="min-h-12 flex-1 resize-none rounded-lg border border-stone-200 bg-stone-50 px-3 py-2 text-sm leading-6 text-stone-900 placeholder:text-stone-400 focus:border-primary-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-primary-500/20"
          disabled={disabled}
        />
        <Button type="submit" disabled={disabled || !draft.trim()} className="self-end">
          <Send className="h-4 w-4" aria-hidden="true" />
          Send
        </Button>
      </div>
    </form>
  )
}

export default ChatComposer
