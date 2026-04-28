function LandingPage({ onSelectUserType }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">💬 Haggly</h1>
          <p className="text-xl text-purple-100 font-light">Your AI-powered negotiation assistant</p>
        </div>

        <h2 className="text-3xl font-semibold text-white mb-12">Are you buying or selling?</h2>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => onSelectUserType('seller')}
            className="w-full sm:w-64 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-6 px-8 rounded-2xl text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <span className="text-2xl">📤</span>
            I'm Selling
          </button>

          <button
            onClick={() => onSelectUserType('buyer')}
            className="w-full sm:w-64 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-6 px-8 rounded-2xl text-xl shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3"
          >
            <span className="text-2xl">🛒</span>
            I'm Buying
          </button>
        </div>

        <p className="text-purple-200 mt-12 text-lg">
          Get personalized scripts and strategies for any negotiation
        </p>
      </div>
    </div>
  )
}

export default LandingPage
