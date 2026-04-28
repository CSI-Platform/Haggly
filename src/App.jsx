import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import BuyerPage from './pages/BuyerPage'
import SellerPage from './pages/SellerPage'
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

  if (!userType) {
    return <LandingPage onSelectUserType={setUserType} />
  }

  if (userType === 'buyer') {
    return <BuyerPage onBack={() => setUserType(null)} />
  }

  return (
    <SellerPage
      responses={responses}
      toast={toast}
      isGenerating={isGenerating}
      onBack={() => setUserType(null)}
      onGenerate={handleGenerate}
      onReset={handleReset}
      onCopy={showToast}
    />
  )
}

export default App
