import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import BuyerPage from './pages/BuyerPage'
import SellerPage from './pages/SellerPage'

function App() {
  const [userType, setUserType] = useState(null) // 'buyer' or 'seller'
  const [toast, setToast] = useState(null)

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(null), 2000)
  }

  if (!userType) {
    return <LandingPage onSelectUserType={setUserType} />
  }

  if (userType === 'buyer') {
    return (
      <BuyerPage
        onBack={() => setUserType(null)}
        onCopy={showToast}
      />
    )
  }

  return (
    <SellerPage
      toast={toast}
      onBack={() => setUserType(null)}
      onCopy={showToast}
    />
  )
}

export default App
