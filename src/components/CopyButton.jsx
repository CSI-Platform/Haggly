import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import Button from './ui/Button'

function CopyButton({ text, onCopy }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      onCopy?.()
      
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    } catch (err) {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      document.body.appendChild(textArea)
      textArea.select()
      
      try {
        document.execCommand('copy')
        setCopied(true)
        onCopy?.()
        setTimeout(() => setCopied(false), 2000)
      } catch (fallbackErr) {
        console.error('Failed to copy:', fallbackErr)
      }
      
      document.body.removeChild(textArea)
    }
  }

  return (
    <Button
      onClick={handleCopy}
      variant={copied ? 'primary' : 'muted'}
      size="sm"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4" aria-hidden="true" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" aria-hidden="true" />
          Copy
        </>
      )}
    </Button>
  )
}

export default CopyButton
