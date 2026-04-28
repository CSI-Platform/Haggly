import InputForm from '../components/InputForm'
import ResponseCard from '../components/ResponseCard'
import Toast from '../components/Toast'

function SellerPage({ responses, toast, isGenerating, onBack, onGenerate, onReset, onCopy }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <Toast message={toast} />

      <header className="pt-8 pb-6 px-4">
        <div className="max-w-lg mx-auto text-center">
          <button
            onClick={onBack}
            className="absolute left-4 top-8 text-green-600 hover:text-green-700 text-sm font-medium"
          >
            ← Back
          </button>

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

      <main className="px-4 pb-12">
        <div className="max-w-lg mx-auto">
          <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 p-6 mb-8">
            <InputForm
              onGenerate={onGenerate}
              isGenerating={isGenerating}
            />
          </div>

          {responses && (
            <div id="results" className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Responses
                </h2>
                <button
                  onClick={onReset}
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
                  onCopy={() => onCopy('Copied to clipboard!')}
                  delay={index * 100}
                />
              ))}

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

          {!responses && (
            <div className="text-center py-8 text-gray-400">
              <div className="text-5xl mb-4">💬</div>
              <p>Fill in the details above to generate responses</p>
            </div>
          )}
        </div>
      </main>

      <footer className="text-center py-6 text-gray-400 text-sm">
        <p>Made with 💜 for marketplace sellers everywhere</p>
      </footer>
    </div>
  )
}

export default SellerPage
