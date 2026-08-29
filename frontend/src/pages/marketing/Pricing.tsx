import { Check } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'
import { MarketingHeader } from '@/components/marketing/MarketingHeader'
import { MarketingCta } from '@/components/marketing/MarketingCta'
import { TIERS } from '@/lib/marketing'
import { cn } from '@/lib/cn'

export function Pricing() {
  return (
    <>
      <MarketingHeader
        eyebrow="Pricing"
        title="Start free. Upgrade when it stings."
        lead="Run one read for nothing. Move up when you want the weekly loop and the benchmarks."
      />

      <section className="px-5 py-20">
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-4 lg:grid-cols-3">
            {TIERS.map((tier) => (
              <Panel
                key={tier.name}
                className={cn('flex h-full flex-col p-6', tier.featured && 'border-line-strong')}
              >
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base">{tier.name}</h3>
                  {tier.featured && <span className="label-mono">Most picked</span>}
                </div>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-mono text-3xl font-medium text-fg">{tier.price}</span>
                  <span className="text-sm text-fg-faint">{tier.cadence}</span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-fg-subtle">{tier.description}</p>

                <ul className="mt-7 flex-1 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-fg-muted">
                      <Check className="mt-0.5 size-3.5 shrink-0 text-fg-faint" strokeWidth={2} />
                      {f}
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  to="/signup"
                  variant={tier.featured ? 'primary' : 'outline'}
                  className="mt-8 w-full"
                >
                  {tier.cta}
                </ButtonLink>
              </Panel>
            ))}
          </div>

          <Panel className="mt-4 flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-base">Campus and career centers</h3>
              <p className="mt-2 max-w-xl text-sm text-fg-subtle">
                License Hablytics for your students and get a defensible read on whether your
                graduates are actually job ready.
              </p>
            </div>
            <ButtonLink to="/signup" variant="outline" className="shrink-0">
              Talk to us
            </ButtonLink>
          </Panel>

          <p className="mt-8 text-sm text-fg-faint">
            Every plan is read only and cancellable at any time. Disconnect a source and its data
            stops flowing immediately.
          </p>
        </div>
      </section>

      <MarketingCta />
    </>
  )
}
