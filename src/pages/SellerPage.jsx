import { ArrowLeft, Lightbulb } from 'lucide-react'
import BrandMark from '../components/BrandMark'
import Toast from '../components/Toast'
import Button from '../components/ui/Button'
import Surface from '../components/ui/Surface'
import ChatPanel from '../features/chat/ChatPanel'

function SellerPage({ toast, onBack, onCopy }) {
  return (
    <div className="min-h-screen bg-[#f7faf5] px-4 py-6 text-stone-950 sm:px-6 lg:px-8">
      <Toast message={toast} />

      <header className="mx-auto flex max-w-5xl items-center justify-between">
        <BrandMark compact />
        <Button onClick={onBack} variant="ghost" size="sm">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back
        </Button>
      </header>

      <main className="mx-auto grid max-w-5xl gap-8 py-10 lg:grid-cols-[0.9fr_1.1fr]">
        <section>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">
            Seller workspace
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-normal text-stone-950 sm:text-5xl">
            Let Haggly read the negotiation.
          </h1>
          <p className="mt-4 text-lg leading-8 text-stone-600">
            Share the situation and let the agent diagnose leverage before it suggests what to do next.
          </p>

          <Surface className="mt-8 p-4">
            <div className="flex gap-3">
              <Lightbulb className="mt-0.5 h-5 w-5 flex-none text-primary-700" aria-hidden="true" />
              <div>
                <p className="font-semibold text-primary-950">Try this</p>
                <p className="mt-1 text-sm leading-6 text-stone-600">
                  "I'm selling a gaming chair for $200. They offered $100. I would take $160, but I don't want to seem desperate."
                </p>
              </div>
            </div>
          </Surface>
        </section>

        <ChatPanel mode="seller" onCopy={onCopy} />
      </main>

      <footer className="mx-auto max-w-5xl pb-6 text-sm text-stone-400">
        <p>Haggly v2 preview</p>
      </footer>
    </div>
  )
}

export default SellerPage
