import { ArrowRight, ShoppingBag, Tag } from 'lucide-react'
import BrandMark from '../components/BrandMark'
import Button from '../components/ui/Button'
import Surface from '../components/ui/Surface'
import ConversationDashboard from '../features/dashboard/ConversationDashboard'

function LandingPage({ conversations, onClearHistory, onOpenConversation, onSelectUserType }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#d9f7e4_0,#f7faf5_34%,#f4f1ea_100%)] px-4 py-6 text-stone-950 sm:px-6 lg:px-8">
      <main className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col">
        <header className="flex items-center justify-between">
          <BrandMark />
          <span className="rounded-full border border-primary-200 bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-800">
            v2 preview
          </span>
        </header>

        <section className="grid flex-1 items-center gap-8 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-14">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary-700">
              No-login negotiation workspace
            </p>
            <h1 className="text-5xl font-bold leading-[1.02] tracking-normal text-stone-950 sm:text-6xl">
              Start the next message with a clearer plan.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-stone-600">
              Pick a side, add the deal context, and draft a response you can send with confidence.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button
                onClick={() => onSelectUserType('seller')}
                size="lg"
                className="w-full justify-between"
              >
                <span className="flex items-center gap-3">
                  <Tag className="h-5 w-5" aria-hidden="true" />
                  I'm selling
                </span>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>

              <Button
                onClick={() => onSelectUserType('buyer')}
                variant="secondary"
                size="lg"
                className="w-full justify-between"
              >
                <span className="flex items-center gap-3">
                  <ShoppingBag className="h-5 w-5" aria-hidden="true" />
                  I'm buying
                </span>
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <Surface className="p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between border-b border-stone-200 pb-4">
                <div>
                  <p className="text-sm font-semibold text-stone-950">Workspace preview</p>
                  <p className="mt-1 text-sm text-stone-500">Local, fast, and ready for the AI chat layer.</p>
                </div>
                <span className="rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-800">
                  no login
                </span>
              </div>

              <div className="space-y-5">
                <div className="border-l-2 border-primary-200 pl-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Current focus</p>
                  <p className="mt-2 text-lg font-semibold text-stone-950">Agentic negotiation read</p>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    Diagnose leverage, missing context, and the next move before drafting.
                  </p>
                </div>

                <div className="grid gap-3 border-t border-stone-200 pt-4 sm:grid-cols-3">
                  {['Context', 'Strategy', 'Outcome'].map((label) => (
                    <div key={label}>
                      <p className="text-sm font-semibold text-primary-900">{label}</p>
                      <p className="mt-1 h-1.5 rounded-full bg-primary-200" />
                    </div>
                  ))}
                </div>
              </div>
            </Surface>

            <ConversationDashboard
              conversations={conversations}
              onClearHistory={onClearHistory}
              onOpenConversation={onOpenConversation}
            />
          </div>
        </section>
      </main>
    </div>
  )
}

export default LandingPage
