import { Link } from 'react-router-dom'
import { ButtonLink } from '@/components/ui/Button'

export function MarketingCta() {
  return (
    <section className="border-t border-line px-5 py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="max-w-lg text-3xl sm:text-4xl">
          Find out now, not after the fourth rejection.
        </h2>
        <p className="mt-6 max-w-md text-fg-muted">
          Connect one source. Get your first read in minutes. Nobody else is going to tell you
          this.
        </p>
        <div className="mt-9">
          <ButtonLink to="/signup" size="lg">
            Run my first scan
          </ButtonLink>
        </div>
        <p className="mt-6 text-sm text-fg-faint">
          Already using it?{' '}
          <Link to="/login" className="link-accent">
            Log in
          </Link>
        </p>
      </div>
    </section>
  )
}
