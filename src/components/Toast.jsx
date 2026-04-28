import { Check } from 'lucide-react'

function Toast({ message }) {
  if (!message) {
    return null
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
      <div className="bg-primary-800 text-white px-5 py-3 rounded-full shadow-lg shadow-primary-900/20 flex items-center gap-2">
        <Check className="h-4 w-4" aria-hidden="true" />
        {message}
      </div>
    </div>
  )
}

export default Toast
