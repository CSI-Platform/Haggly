function BuyerPage({ onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <header className="pt-8 pb-6 px-4">
        <div className="max-w-lg mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={onBack}
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

export default BuyerPage
