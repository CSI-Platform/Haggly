import { ArrowLeft, BadgeQuestionMark, Car, MessageSquareText, Search } from 'lucide-react'
import BrandMark from '../components/BrandMark'
import Button from '../components/ui/Button'
import ChatPanel from '../features/chat/ChatPanel'

function BuyerPage({ onBack, onCopy }) {
  const upcomingTools = [
    { icon: Search, label: 'Question builder' },
    { icon: MessageSquareText, label: 'Response scripts' },
    { icon: BadgeQuestionMark, label: 'Deal check' },
    { icon: Car, label: 'Car buying mode' },
  ]

  return (
    <div className="min-h-screen bg-[#f7faf5] px-4 py-6 text-stone-950 sm:px-6 lg:px-8">
      <header className="mx-auto flex max-w-5xl items-center justify-between">
        <BrandMark compact />
        <Button onClick={onBack} variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Button>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 py-10 lg:grid-cols-[0.85fr_1.15fr]">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">
            Buyer workspace
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-normal text-stone-950 sm:text-5xl">
            Let Haggly read the seller.
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
            Give it the listing, seller behavior, and your walk-away number before you make the next move.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {upcomingTools.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-sm shadow-stone-900/5">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-800">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="font-semibold text-stone-800">{label}</span>
              </div>
            ))}
          </div>
        </section>

        <ChatPanel mode="buyer" onCopy={onCopy} />
      </main>
    </div>
  )
}

export default BuyerPage
