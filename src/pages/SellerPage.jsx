import { ArrowLeft, Lightbulb, RotateCcw } from 'lucide-react'
import BrandMark from '../components/BrandMark'
import InputForm from '../components/InputForm'
import ResponseCard from '../components/ResponseCard'
import Toast from '../components/Toast'
import Button from '../components/ui/Button'
import Surface from '../components/ui/Surface'

function SellerPage({ responses, toast, isGenerating, onBack, onGenerate, onReset, onCopy }) {
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
            Turn an offer into a clear reply.
          </h1>
          <p className="mt-4 text-lg leading-8 text-stone-600">
            Add the numbers, keep the boundary, and generate three response styles.
          </p>

          <div className="mt-8 text-sm text-stone-500">
            <p className="font-semibold text-stone-800">Current mode</p>
            <p className="mt-2 leading-6">Template responses now. Chat and local dashboard are the next slices.</p>
          </div>
        </section>

        <section>
          <Surface className="mb-6 p-5 sm:p-6">
            <InputForm
              onGenerate={onGenerate}
              isGenerating={isGenerating}
            />
          </Surface>

          {responses && (
            <div id="results" className="space-y-4 animate-fade-in">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  Your Responses
                </h2>
                <Button onClick={onReset} variant="ghost" size="sm">
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  New
                </Button>
              </div>

              <p className="text-gray-500 text-sm">
                Pick the tone that fits your style. Tap to copy!
              </p>

              {responses.map((response, index) => (
                <ResponseCard
                  key={index}
                  tone={response.tone}
                  message={response.message}
                  description={response.description}
                  onCopy={() => onCopy('Copied to clipboard!')}
                  delay={index * 100}
                />
              ))}

              <div className="mt-8 rounded-lg border border-primary-100 bg-primary-50 p-4">
                <h3 className="font-semibold text-primary-900 mb-2 flex items-center gap-2">
                  <Lightbulb className="h-4 w-4" aria-hidden="true" />
                  Quick tips
                </h3>
                <ul className="text-sm text-primary-800 space-y-1">
                  <li>• Be polite but firm because you set the price for a reason</li>
                  <li>• It's okay to say no because good buyers respect fair prices</li>
                  <li>• Don't take lowballs personally, just part of the game</li>
                </ul>
              </div>
            </div>
          )}

          {!responses && (
            <div className="rounded-lg border border-dashed border-stone-300 bg-white/60 py-10 text-center text-stone-400">
              <p>Responses will appear here.</p>
            </div>
          )}
        </section>
      </main>

      <footer className="mx-auto max-w-5xl pb-6 text-sm text-stone-400">
        <p>Haggly v2 preview</p>
      </footer>
    </div>
  )
}

export default SellerPage
