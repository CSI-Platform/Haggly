import CopyButton from './CopyButton'

function ResponseCard({ tone, emoji, message, description, onCopy, delay = 0 }) {
  const toneColors = {
    friendly: {
      bg: 'bg-emerald-50',
      border: 'border-emerald-200',
      badge: 'bg-emerald-100 text-emerald-700',
      accent: 'text-emerald-600'
    },
    firm: {
      bg: 'bg-amber-50',
      border: 'border-amber-200',
      badge: 'bg-amber-100 text-amber-700',
      accent: 'text-amber-600'
    },
    casual: {
      bg: 'bg-sky-50',
      border: 'border-sky-200',
      badge: 'bg-sky-100 text-sky-700',
      accent: 'text-sky-600'
    }
  }

  const colors = toneColors[tone.toLowerCase()] || toneColors.friendly

  return (
    <div 
      className={`
        ${colors.bg} ${colors.border} border-2 rounded-2xl p-5 
        card-hover animate-slide-up
      `}
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{emoji}</span>
          <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colors.badge}`}>
            {tone}
          </span>
        </div>
        <CopyButton text={message} onCopy={onCopy} />
      </div>

      {/* Message */}
      <div className="bg-white/70 rounded-xl p-4 border border-white">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
          {message}
        </p>
      </div>

      {/* Description */}
      {description && (
        <p className={`mt-3 text-sm ${colors.accent}`}>
          {description}
        </p>
      )}
    </div>
  )
}

export default ResponseCard
