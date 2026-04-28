import CopyButton from '../../components/CopyButton'

function ChatMessage({ message, onCopy }) {
  const isAssistant = message.role === 'assistant'

  return (
    <article className={`flex ${isAssistant ? 'justify-start' : 'justify-end'}`}>
      <div
        className={[
          'max-w-[88%] rounded-lg px-4 py-3 shadow-sm',
          isAssistant
            ? 'border border-stone-200 bg-white text-stone-800 shadow-stone-900/5'
            : 'bg-primary-700 text-white shadow-primary-900/15',
        ].join(' ')}
      >
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className={`text-xs font-semibold uppercase tracking-[0.14em] ${isAssistant ? 'text-primary-700' : 'text-primary-100'}`}>
            {isAssistant ? 'Haggly' : 'You'}
          </span>
          {isAssistant && <CopyButton text={message.content} onCopy={onCopy} />}
        </div>
        <p className="whitespace-pre-wrap text-sm leading-6">{message.content}</p>
      </div>
    </article>
  )
}

export default ChatMessage
