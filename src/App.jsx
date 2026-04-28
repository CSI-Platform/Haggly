import { useState } from 'react'
import LandingPage from './pages/LandingPage'
import BuyerPage from './pages/BuyerPage'
import SellerPage from './pages/SellerPage'
import {
  clearStoredConversations,
  getStoredConversations,
  saveConversation,
} from './lib/storage/conversationStorage'

function App() {
  const [userType, setUserType] = useState(null) // 'buyer' or 'seller'
  const [activeConversation, setActiveConversation] = useState(null)
  const [conversations, setConversations] = useState(() => getStoredConversations())
  const [toast, setToast] = useState(null)

  const refreshConversations = () => {
    setConversations(getStoredConversations())
  }

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(null), 2000)
  }

  const handleSelectUserType = (mode) => {
    setActiveConversation(null)
    setUserType(mode)
  }

  const handleOpenConversation = (conversation) => {
    setActiveConversation(conversation)
    setUserType(conversation.mode)
  }

  const handleConversationChange = (conversation) => {
    const savedConversation = saveConversation(conversation)
    setActiveConversation(savedConversation)
    setConversations(getStoredConversations())
  }

  const handleClearHistory = () => {
    clearStoredConversations()
    setActiveConversation(null)
    setConversations([])
    showToast('Local history cleared')
  }

  const handleBack = () => {
    setActiveConversation(null)
    refreshConversations()
    setUserType(null)
  }

  if (!userType) {
    return (
      <LandingPage
        conversations={conversations}
        onClearHistory={handleClearHistory}
        onOpenConversation={handleOpenConversation}
        onSelectUserType={handleSelectUserType}
      />
    )
  }

  if (userType === 'buyer') {
    return (
      <BuyerPage
        conversation={activeConversation}
        onBack={handleBack}
        onConversationChange={handleConversationChange}
        onCopy={showToast}
      />
    )
  }

  return (
    <SellerPage
      conversation={activeConversation}
      toast={toast}
      onBack={handleBack}
      onConversationChange={handleConversationChange}
      onCopy={showToast}
    />
  )
}

export default App
