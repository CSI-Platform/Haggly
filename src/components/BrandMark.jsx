import { MessageCircleMore } from 'lucide-react'

function BrandMark({ compact = false }) {
  return (
    <div className="inline-flex items-center gap-3">
      <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-700 text-white shadow-sm shadow-primary-900/20">
        <MessageCircleMore className="h-5 w-5" aria-hidden="true" />
      </span>
      <span>
        <span className="block text-2xl font-bold leading-none tracking-normal text-stone-950">Haggly</span>
        {!compact && (
          <span className="mt-1 block text-sm font-medium text-stone-500">AI negotiation workspace</span>
        )}
      </span>
    </div>
  )
}

export default BrandMark
