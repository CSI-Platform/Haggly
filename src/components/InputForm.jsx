import { useState } from 'react'
import { LoaderCircle, Sparkles } from 'lucide-react'
import Button from './ui/Button'

function InputForm({ onGenerate, isGenerating }) {
  const [formData, setFormData] = useState({
    item: '',
    askingPrice: '',
    theirOffer: '',
    minimumPrice: ''
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }))
    }
  }

  const validate = () => {
    const newErrors = {}
    
    if (!formData.item.trim()) {
      newErrors.item = 'What are you selling?'
    }
    
    if (!formData.askingPrice || parseFloat(formData.askingPrice) <= 0) {
      newErrors.askingPrice = 'Enter your asking price'
    }
    
    if (!formData.theirOffer || parseFloat(formData.theirOffer) <= 0) {
      newErrors.theirOffer = 'Enter their offer'
    }

    if (formData.minimumPrice && parseFloat(formData.minimumPrice) > parseFloat(formData.askingPrice)) {
      newErrors.minimumPrice = 'Minimum can\'t be higher than asking price'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validate()) {
      onGenerate({
        item: formData.item.trim(),
        askingPrice: parseFloat(formData.askingPrice),
        theirOffer: parseFloat(formData.theirOffer),
        minimumPrice: formData.minimumPrice ? parseFloat(formData.minimumPrice) : null
      })
    }
  }

  const inputClasses = (fieldName) => `
    w-full rounded-lg border px-4 py-3 transition-all duration-200
    ${errors[fieldName] 
      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
      : 'border-stone-200 bg-stone-50 focus:border-primary-500 focus:bg-white focus:ring-primary-500/20'
    }
    focus:ring-4 focus:outline-none
    placeholder:text-stone-400
  `

  const labelClasses = "block text-sm font-semibold text-stone-700 mb-1.5"

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="item" className={labelClasses}>
          What are you selling?
        </label>
        <input
          type="text"
          id="item"
          name="item"
          value={formData.item}
          onChange={handleChange}
          placeholder="e.g., Gaming chair, iPhone 12, Vintage lamp"
          className={inputClasses('item')}
          autoComplete="off"
        />
        {errors.item && (
          <p className="text-red-600 text-sm mt-1">{errors.item}</p>
        )}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="askingPrice" className={labelClasses}>
            Your asking price
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 font-medium">
              $
            </span>
            <input
              type="number"
              id="askingPrice"
              name="askingPrice"
              value={formData.askingPrice}
              onChange={handleChange}
              placeholder="150"
              min="0"
              step="0.01"
              className={`${inputClasses('askingPrice')} pl-8`}
            />
          </div>
          {errors.askingPrice && (
            <p className="text-red-600 text-sm mt-1">{errors.askingPrice}</p>
          )}
        </div>

        <div>
          <label htmlFor="theirOffer" className={labelClasses}>
            Their offer
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 font-medium">
              $
            </span>
            <input
              type="number"
              id="theirOffer"
              name="theirOffer"
              value={formData.theirOffer}
              onChange={handleChange}
              placeholder="80"
              min="0"
              step="0.01"
              className={`${inputClasses('theirOffer')} pl-8`}
            />
          </div>
          {errors.theirOffer && (
            <p className="text-red-600 text-sm mt-1">{errors.theirOffer}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="minimumPrice" className={labelClasses}>
          Your minimum acceptable price 
          <span className="text-stone-400 font-normal ml-1">(optional)</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 font-medium">
            $
          </span>
          <input
            type="number"
            id="minimumPrice"
            name="minimumPrice"
            value={formData.minimumPrice}
            onChange={handleChange}
            placeholder="120"
            min="0"
            step="0.01"
            className={`${inputClasses('minimumPrice')} pl-8`}
          />
        </div>
        {errors.minimumPrice && (
          <p className="text-red-600 text-sm mt-1">{errors.minimumPrice}</p>
        )}
        <p className="text-stone-400 text-xs mt-1">
          The lowest you'd go before walking away
        </p>
      </div>

      <Button
        type="submit"
        disabled={isGenerating}
        size="lg"
        className="w-full"
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
            Generating...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5" aria-hidden="true" />
            Generate Responses
          </span>
        )}
      </Button>
    </form>
  )
}

export default InputForm
