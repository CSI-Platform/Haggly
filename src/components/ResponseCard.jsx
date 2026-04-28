import CopyButton from './CopyButton'

function ResponseCard({ tone, message, description, onCopy, delay = 0 }) {
  const toneColors = {
    friendly: {
      bg: 'bg-primary-50',
      border: 'border-primary-100',
      badge: 'bg-primary-100 text-primary-800',
      accent: 'text-primary-700',
      dot: 'bg-primary-500',
    },
    firm: {
      bg: 'bg-amber-50',
      border: 'border-amber-100',
      badge: 'bg-amber-100 text-amber-800',
      accent: 'text-amber-800',
      dot: 'bg-amber-500',
    },
    casual: {
      bg: 'bg-stone-50',
      border: 'border-stone-200',
      badge: 'bg-stone-200 text-stone-800',
      accent: 'text-stone-600',
      dot: 'bg-stone-500',
    }
  }

  const colors = toneColors[tone.toLowerCase()] || toneColors.friendly

  return (
    <div 
      className={`
        ${colors.bg} ${colors.border} rounded-lg border p-5
        card-hover animate-slide-up
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${colors.dot}`} />
          <span className={`rounded-full px-3 py-1 text-sm font-semibold ${colors.badge}`}>
            {tone}
          </span>
        </div>
        <CopyButton text={message} onCopy={onCopy} />
      </div>

      <div className="border-l-2 border-current/20 pl-4">
        <p className="text-stone-800 leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
      </div>

      {description && (
        <p className={`mt-3 text-sm ${colors.accent}`}>
          {description}
        </p>
      )}
    </div>
  )
}

export default ResponseCard
