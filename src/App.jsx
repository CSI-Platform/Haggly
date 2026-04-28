import { useState } from 'react'
import InputForm from './components/InputForm'
import ResponseCard from './components/ResponseCard'
import { generateMessages } from './utils/messageGenerator'

function App() {
  const [userType, setUserType] = useState(null) // 'buyer' or 'seller'
  const [responses, setResponses] = useState(null)
  const [toast, setToast] = useState(null)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = (formData) => {
    setIsGenerating(true)
    
    // Small delay for visual feedback
    setTimeout(() => {
      const messages = generateMessages(formData)
      setResponses(messages)
      setIsGenerating(false)
      
      // Scroll to results on mobile
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }, 300)
  }

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(null), 2000)
  }

  const handleReset = () => {
    setResponses(null)
    setUserType(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Landing Page - User Type Selection
  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 flex items-center justify-center p-4">
        <div className="text-center max-w-2xl mx-auto">
          {/* Logo */}
          <div className="mb-8">
            <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">💬 Haggly</h1>
            <p className="text-xl text-purple-100 font-light">Your AI-powered negotiation assistant</p>
          </div>

          {/* Question */}
          <h2 className="text-3xl font-semibold text-white mb-12">Are you buying or selling?</h2>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={() => setUserType('seller')}
              className="w-full sm:w-64 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-6 px-8 rounded-2xl text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span className="text-2xl">📤</span>
              I'm Selling
            </button>
            
            <button
              onClick={() => setUserType('buyer')}
              className="w-full sm:w-64 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-6 px-8 rounded-2xl text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
            >
              <span className="text-2xl">🛒</span>
              I'm Buying
            </button>
          </div>

          {/* Subtitle */}
          <p className="text-purple-200 mt-12 text-lg">
            Get personalized scripts and strategies for any negotiation
          </p>
        </div>
      </div>
    )
  }

  // Buyer Page - Coming Soon
  if (userType === 'buyer') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        {/* Header */}
        <header className="pt-8 pb-6 px-4">
          <div className="max-w-lg mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <button
                onClick={() => setUserType(null)}
                className="absolute left-4 top-8 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                ← Back
              </button>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-2xl">🛒</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">Haggly</h1>
            </div>
            <p className="text-gray-600 text-lg">
              Buyer Tools - Coming Soon!
            </p>
          </div>
        </header>

        {/* Coming Soon Content */}
        <main className="px-4 pb-12">
          <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-8 text-center">
              <div className="text-6xl mb-6">🚧</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Coming Very Soon!</h2>
              <p className="text-gray-600 mb-6">
                We're building amazing buyer tools including:
              </p>
              <ul className="text-left text-gray-600 space-y-2 mb-8">
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  Strategic questioning techniques
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  Negotiation scripts for different scenarios
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  "Guard down" moment detection
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-green-500">✓</span>
                  Car buying specific strategies
                </li>
              </ul>
              <p className="text-sm text-gray-500">
                For now, try our seller tools or check back soon!
              </p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  // Seller Page - Current Functionality
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-up">
          <div className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {toast}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="pt-8 pb-6 px-4">
        <div className="max-w-lg mx-auto text-center">
          <button
            onClick={() => setUserType(null)}
            className="absolute left-4 top-8 text-green-600 hover:text-green-700 text-sm font-medium"
          >
            ← Back
          </button>
          
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-700 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <span className="text-2xl">📤</span>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">Haggly</h1>
          </div>
          
          <p className="text-gray-600 text-lg">
            Generate perfect responses for marketplace negotiations
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Never freeze up when someone lowballs you again
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 pb-12">
        <div className="max-w-lg mx-auto">
          {/* Input Form */}
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 mb-8">
            <InputForm 
              onGenerate={handleGenerate} 
              isGenerating={isGenerating}
            />
          </div>

          {/* Results */}
          {responses && (
            <div id="results" className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Responses
                </h2>
                <button
                  onClick={handleReset}
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  ← New negotiation
                </button>
              </div>
              
              <p className="text-gray-500 text-sm">
                Pick the tone that fits your style. Tap to copy!
              </p>

              {responses.map((response, index) => (
                <ResponseCard
                  key={index}
                  tone={response.tone}
                  emoji={response.emoji}
                  message={response.message}
                  description={response.description}
                  onCopy={() => showToast('Copied to clipboard!')}
                  delay={index * 100}
                />
              ))}

              {/* Tips Section */}
              <div className="mt-8 p-4 bg-green-50 rounded-xl border border-green-100">
                <h3 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                  <span>💡</span> Quick Tips
                </h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Be polite but firm — you set the price for a reason</li>
                  <li>• It's okay to say no — good buyers respect fair prices</li>
                  <li>• Don't take lowballs personally, just part of the game</li>
                </ul>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!responses && (
            <div className="text-center py-8 text-gray-400">
              <div className="text-5xl mb-4">💬</div>
              <p>Fill in the details above to generate responses</p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-400 text-sm">
        <p>Made with 💜 for marketplace sellers everywhere</p>
      </footer>
    </div>
  )
}

export default App