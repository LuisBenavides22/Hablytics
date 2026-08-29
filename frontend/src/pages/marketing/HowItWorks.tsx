import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingCta } from '@/components/marketing/MarketingCta'
import { STEPS, PILLARS } from '@/lib/marketing'

export function HowItWorks() {
  return (
    <>
      <MarketingHeader
        eyebrow="How it works"
        title="Three steps between you and an honest answer"
        lead="No resume parsing, no self-assessment. Hablytics reads the work itself and reports back on what it sees."
      />

      <section className="px-5 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
            {STEPS.map(({ step, title, body }) => (
              <div key={step} className="bg-surface p-6">
                <span className="label-mono">{step}</span>
                <h3 className="mt-5 text-base">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-subtle">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line px-5 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="label-mono">What lands in your report</p>
          <h2 className="mt-5 text-3xl">Four things, every week</h2>
          <p className="mt-4 max-w-xl text-fg-muted">
            No vague encouragement. Every section points at something specific in your own work.
          </p>

          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {PILLARS.map(({ label, body }) => (
              <div key={label} className="bg-surface p-6">
                <h3 className="text-base">{label}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-subtle">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MarketingCta />
    </>
  )
}
