import { Link } from 'react-router-dom'
import { CtaButton } from '@/components/marketing/CtaButton'

export function MarketingCta() {
  return (
    <section className="px-5 py-24">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-line bg-surface px-6 py-16 text-center sm:py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_90%_at_50%_100%,rgb(232_162_61/0.16),transparent)]"
        />
        <div className="relative">
          <h2 className="mx-auto max-w-xl text-3xl sm:text-4xl">
            You already have a type. You just have not seen it.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-fg-muted">
            Connect one source. Get your first read in minutes. Nobody else is going to tell you
            this.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton to="/signup">See my type</CtaButton>
            <CtaButton to="/sample" variant="outline">
              See a sample profile
            </CtaButton>
          </div>
          <p className="mt-7 text-sm text-fg-faint">
            Already using it?{' '}
            <Link to="/login" className="link-accent">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
