import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { MarketingCta } from '@/components/marketing/MarketingCta'
import { PlatformTile } from '@/components/PlatformLogo'
import { INTEGRATIONS } from '@/lib/integrations'
import { STEPS } from '@/lib/marketing'

function SectionLink({ to, children }: { to: string; children: string }) {
  return (
    <Link to={to} className="link-accent inline-flex items-center gap-1.5 text-sm">
      {children}
      <ArrowRight className="size-3.5" strokeWidth={2} />
    </Link>
  )
}

export function Home() {
  return (
    <>
      <section className="px-5 pt-24 pb-24 sm:pt-32">
        <div className="mx-auto max-w-5xl">
          <div className="max-w-3xl animate-rise">
            <p className="label-mono">For college through your first decade</p>

            <h1 className="mt-6 text-[2.5rem] leading-[1.08] sm:text-[3.5rem]">
              Your resume says one thing.
              <br />
              Your work says another.
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-fg-muted">
              Hablytics reads the work you actually produce, from your commits to your docs to your
              threads, and tells you plainly which skills are missing, which ones are carrying you,
              and what to fix in the next 30 days.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/signup" size="lg">
                Run my first scan
              </ButtonLink>
              <ButtonLink to="/login" variant="outline" size="lg">
                I already have an account
              </ButtonLink>
            </div>

            <p className="mt-6 text-sm text-fg-faint">
              Read only access. Revoke any source at any time.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line px-5 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="label-mono">How it works</p>
          <h2 className="mt-5 max-w-xl text-3xl">Three steps between you and an honest answer</h2>

          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
            {STEPS.map(({ step, title }) => (
              <div key={step} className="bg-surface p-6">
                <span className="label-mono">{step}</span>
                <h3 className="mt-5 text-base">{title}</h3>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <SectionLink to="/how-it-works">See how it works</SectionLink>
          </div>
        </div>
      </section>

      <section className="border-t border-line px-5 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="label-mono">Sources</p>
          <h2 className="mt-5 max-w-xl text-3xl">Wherever your work already lives</h2>
          <p className="mt-4 max-w-xl text-fg-muted">
            Connect what is relevant to you. Classwork if you are still in school, work tools once
            you are not.
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
            {INTEGRATIONS.map((i) => (
              <div
                key={i.platform}
                className="flex items-center gap-2.5 rounded-md border border-line bg-surface px-3 py-2"
              >
                <PlatformTile platform={i.platform} size="sm" />
                <span className="text-sm text-fg-muted">{i.name}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <SectionLink to="/sources">See every source</SectionLink>
          </div>
        </div>
      </section>

      <MarketingCta />
    </>
  )
}
