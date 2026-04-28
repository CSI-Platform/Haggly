import CopyButton from '../../components/CopyButton'

function ChatMessage({ message, onCopy }) {
  const isAssistant = message.role === 'assistant'
  const alignmentClass = isAssistant ? 'justify-start' : 'justify-end'
  const bubbleClass = isAssistant
    ? 'border border-stone-200 bg-white text-stone-800 shadow-stone-900/5'
    : 'bg-primary-700 text-white shadow-primary-900/15'
  const labelClass = isAssistant ? 'text-primary-700' : 'text-primary-100'

  return (
    <article className={`flex ${alignmentClass}`}>
      <div
        className={`max-w-[88%] rounded-lg px-4 py-3 shadow-sm ${bubbleClass}`}
      >
        <div className="mb-2 flex items-center justify-between gap-3">
          <span className={`text-xs font-semibold uppercase tracking-[0.14em] ${labelClass}`}>
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
