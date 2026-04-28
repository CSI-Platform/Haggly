import { useState } from 'react'

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
    w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
    ${errors[fieldName] 
      ? 'border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20' 
      : 'border-gray-200 bg-gray-50 focus:border-primary-500 focus:bg-white focus:ring-primary-500/20'
    }
    focus:ring-4 focus:outline-none
    placeholder:text-gray-400
  `

  const labelClasses = "block text-sm font-medium text-gray-700 mb-1.5"

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Item Name */}
      <div>
        <label htmlFor="item" className={labelClasses}>
          What are you selling? 📦
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
          <p className="text-red-500 text-sm mt-1">{errors.item}</p>
        )}
      </div>

      {/* Price Inputs Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Asking Price */}
        <div>
          <label htmlFor="askingPrice" className={labelClasses}>
            Your asking price 💰
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
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
            <p className="text-red-500 text-sm mt-1">{errors.askingPrice}</p>
          )}
        </div>

        {/* Their Offer */}
        <div>
          <label htmlFor="theirOffer" className={labelClasses}>
            Their offer 🤔
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
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
            <p className="text-red-500 text-sm mt-1">{errors.theirOffer}</p>
          )}
        </div>
      </div>

      {/* Minimum Price (Optional) */}
      <div>
        <label htmlFor="minimumPrice" className={labelClasses}>
          Your minimum acceptable price 
          <span className="text-gray-400 font-normal ml-1">(optional)</span>
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-medium">
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
          <p className="text-red-500 text-sm mt-1">{errors.minimumPrice}</p>
        )}
        <p className="text-gray-400 text-xs mt-1">
          The lowest you'd go before walking away
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isGenerating}
        className={`
          w-full py-4 px-6 rounded-xl font-semibold text-white text-lg
          transition-all duration-200 
          ${isGenerating 
            ? 'bg-primary-400 cursor-not-allowed' 
            : 'bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 active:scale-[0.98] shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40'
          }
        `}
      >
        {isGenerating ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Generating...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            <span>✨</span>
            Generate Responses
          </span>
        )}
      </button>
    </form>
  )
}

export default InputForm
