import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Panel } from '@/components/ui/Panel'
import { PlatformTile } from '@/components/PlatformLogo'
import { INTEGRATIONS } from '@/lib/integrations'
import { cn } from '@/lib/cn'

const PILLARS = [
  {
    label: 'Hidden wins',
    body: 'The work you did and already forgot. Pulled out and written in language you can put straight into a review.',
  },
  {
    label: 'Growth gaps',
    body: 'Where your output falls short of the role you want, split across technical, strategic, and soft skills.',
  },
  {
    label: 'How you communicate',
    body: 'Tone, structure, and follow-through, measured against how people one level up actually write.',
  },
  {
    label: 'Who to know',
    body: 'The people already in your orbit worth building a real relationship with.',
  },
]

const STEPS = [
  {
    step: '01',
    title: 'Connect your real work',
    body: 'GitHub, Slack, Notion, Drive, Canvas, your inbox. Read only, revocable, scoped to what you approve.',
  },
  {
    step: '02',
    title: 'We read what you shipped',
    body: 'Not your resume. The commits, the docs, the threads, the essays. The evidence of how you actually operate.',
  },
  {
    step: '03',
    title: 'Get the gap and the fix',
    body: 'A weekly report on what is holding you back, plus a 30 day plan specific enough to start on Monday.',
  },
]

const TIERS = [
  {
    name: 'Snapshot',
    price: 'Free',
    cadence: '',
    description: 'One source, one read. See what it finds before you commit.',
    features: ['Connect one source', 'One time skill snapshot', 'Top gaps surfaced'],
    cta: 'Start free',
    featured: false,
  },
  {
    name: 'Tracking',
    price: '$12',
    cadence: '/mo',
    description: 'The full loop. Weekly reads, role matching, and a plan that updates as you do.',
    features: [
      'Every source connected',
      'Weekly tracking reports',
      'Role and posting matching',
      '30 day improvement plans',
    ],
    cta: 'Start tracking',
    featured: true,
  },
  {
    name: 'Benchmark',
    price: '$15',
    cadence: '/mo',
    description: 'Everything in Tracking, plus where you rank against people chasing your roles.',
    features: [
      'Everything in Tracking',
      'Peer benchmarking',
      'Rank against same role applicants',
      'Promotion pattern analysis',
    ],
    cta: 'Get benchmarks',
    featured: false,
  },
]

export function Landing() {
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

      <section id="how" className="scroll-mt-16 border-t border-line px-5 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="label-mono">How it works</p>
          <h2 className="mt-5 max-w-xl text-3xl">Three steps between you and an honest answer</h2>

          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
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

      <section id="sources" className="scroll-mt-16 border-t border-line px-5 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="label-mono">Sources</p>
          <h2 className="mt-5 text-3xl">Wherever your work already lives</h2>
          <p className="mt-4 max-w-xl text-fg-muted">
            Connect what is relevant to you. Classwork if you are still in school, work tools once
            you are not.
          </p>

          <div className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {INTEGRATIONS.map((i) => (
              <div key={i.platform} className="bg-surface p-5">
                <div className="flex items-center gap-3">
                  <PlatformTile platform={i.platform} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm text-fg">{i.name}</p>
                    <p className="label-mono mt-1">{i.available ? 'Live' : 'Soon'}</p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-relaxed text-fg-faint">{i.reads}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-16 border-t border-line px-5 py-24">
        <div className="mx-auto max-w-5xl">
          <p className="label-mono">Pricing</p>
          <h2 className="mt-5 text-3xl">Start free. Upgrade when it stings.</h2>

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
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
        </div>
      </section>

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
    </>
  )
}
