import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Radar,
  ScanLine,
  Route,
  Trophy,
  TrendingUp,
  MessageSquare,
  Users,
  Check,
  Lock,
} from 'lucide-react'
import { ButtonLink } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Panel } from '@/components/ui/Panel'
import { PlatformMark } from '@/components/PlatformMark'
import { INTEGRATIONS } from '@/lib/integrations'
import { cn } from '@/lib/cn'

const PILLARS = [
  {
    icon: Trophy,
    label: 'Hidden wins',
    tone: 'strong' as const,
    body: 'The work you did that you already forgot. Pulled out and written in review-ready language.',
  },
  {
    icon: TrendingUp,
    label: 'Growth gaps',
    tone: 'gap' as const,
    body: 'Where your output falls short of the role you want, split across technical, strategic, and soft skills.',
  },
  {
    icon: MessageSquare,
    label: 'How you communicate',
    tone: 'signal' as const,
    body: 'Tone, structure, and follow-through, judged against how people at the next level actually write.',
  },
  {
    icon: Users,
    label: 'Who to know',
    tone: 'flux' as const,
    body: 'The people already in your orbit who are worth building a real relationship with.',
  },
]

const STEPS = [
  {
    icon: Radar,
    step: '01',
    title: 'Connect your real work',
    body: 'GitHub, Slack, Notion, Drive, Canvas, your inbox. Read-only, revocable, scoped to what you approve.',
  },
  {
    icon: ScanLine,
    step: '02',
    title: 'We read what you shipped',
    body: 'Not your résumé. The commits, the docs, the threads, the essays. The evidence of how you actually operate.',
  },
  {
    icon: Route,
    step: '03',
    title: 'Get the gap and the fix',
    body: 'A weekly report on what is holding you back, plus a 30-day plan specific enough to start on Monday.',
  },
]

const TIERS = [
  {
    name: 'Snapshot',
    price: 'Free',
    cadence: '',
    description: 'One source, one read. See what it finds before you commit.',
    features: ['Connect one source', 'One-time skill snapshot', 'Top gaps surfaced'],
    cta: 'Start free',
    to: '/signup',
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
      '30-day improvement plans',
    ],
    cta: 'Start tracking',
    to: '/signup',
    featured: true,
  },
  {
    name: 'Benchmark',
    price: '$15',
    cadence: '/mo',
    description: 'Everything in Tracking, plus where you actually rank against people chasing your roles.',
    features: [
      'Everything in Tracking',
      'Peer benchmarking',
      'Rank against same-role applicants',
      'Promotion pattern analysis',
    ],
    cta: 'Get benchmarks',
    to: '/signup',
    featured: false,
  },
]

function HeroScan() {
  return (
    <Panel glow className="p-1">
      <div className="rounded-[0.9rem] bg-void/60 p-5">
        <div className="flex items-center justify-between">
          <p className="label-mono text-ash-500">Report scaffold</p>
          <Badge tone="signal" dot>
            Awaiting source
          </Badge>
        </div>

        <div className="relative mt-5 overflow-hidden rounded-xl border border-white/8 bg-abyss/60">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 animate-sweep bg-linear-to-b from-transparent via-signal-400/10 to-transparent" />

          <div className="divide-y divide-white/6">
            {PILLARS.map(({ icon: Icon, label, tone }) => (
              <div key={label} className="flex items-center gap-3 px-4 py-3.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-white/8 bg-white/4">
                  <Icon className="size-3.5 text-ash-400" strokeWidth={1.75} />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-ash-100">{label}</p>
                  <div className="mt-1.5 flex gap-1.5">
                    <span className="h-1 w-full max-w-24 rounded-full bg-white/8" />
                    <span className="h-1 w-full max-w-12 rounded-full bg-white/5" />
                  </div>
                </div>
                <Badge tone={tone}>&mdash;</Badge>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-ash-500">
          Connect a source and this fills with your own work.
        </p>
      </div>
    </Panel>
  )
}

export function Landing() {
  return (
    <>
      <section className="relative overflow-hidden px-5 pt-20 pb-24 sm:pt-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-rise">
            <Badge tone="flux" dot className="mb-6">
              For college through your first decade
            </Badge>

            <h1 className="text-[2.75rem] leading-[1.05] sm:text-6xl">
              Your résumé says one thing.
              <br />
              <span className="text-gradient">Your work says another.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ash-300">
              Hablytics reads the work you actually produce &mdash; your commits, docs, threads,
              and essays &mdash; and tells you plainly which skills are missing, which ones are
              carrying you, and what to fix in the next 30 days.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <ButtonLink to="/signup" size="lg">
                Run my first scan
                <ArrowRight className="size-4" strokeWidth={2} />
              </ButtonLink>
              <ButtonLink to="/login" variant="outline" size="lg">
                I already have an account
              </ButtonLink>
            </div>

            <p className="mt-6 flex items-center gap-2 text-sm text-ash-500">
              <Lock className="size-3.5" strokeWidth={1.75} />
              Read-only access. Revoke any source at any time.
            </p>
          </div>

          <div className="animate-rise [animation-delay:120ms]">
            <HeroScan />
          </div>
        </div>
      </section>

      <section id="how" className="scroll-mt-20 border-t border-white/6 px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="label-mono text-signal-400">How it works</p>
          <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl">
            Three steps between you and an honest answer
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, step, title, body }) => (
              <Panel key={step} className="hairline-top p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl border border-white/8 bg-linear-to-br from-signal-400/15 to-flux-500/10">
                    <Icon className="size-4.5 text-signal-300" strokeWidth={1.75} />
                  </span>
                  <span className="label-mono text-ash-500">{step}</span>
                </div>
                <h3 className="mt-5 text-lg">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ash-400">{body}</p>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/6 px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="label-mono text-flux-400">What lands in your report</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Four things, every single week</h2>
            <p className="mt-4 text-ash-400">
              No vague encouragement. Every section points at something specific in your own work.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {PILLARS.map(({ icon: Icon, label, body, tone }) => (
              <Panel key={label} className="group p-6 transition-colors hover:border-white/14">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/8 bg-white/4">
                    <Icon className="size-5 text-ash-300" strokeWidth={1.5} />
                  </span>
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg">{label}</h3>
                      <Badge tone={tone}>Pillar</Badge>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ash-400">{body}</p>
                  </div>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section id="sources" className="scroll-mt-20 border-t border-white/6 px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="label-mono text-signal-400">Sources</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Wherever your work already lives</h2>
            <p className="mt-4 text-ash-400">
              Connect what is relevant to you. Classwork if you are still in school, work tools once
              you are not.
            </p>
          </div>

          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {INTEGRATIONS.map((i) => (
              <Panel key={i.platform} className="p-4">
                <div className="flex items-center gap-3">
                  <PlatformMark platform={i.platform} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-ash-100">{i.name}</p>
                    <p className="label-mono mt-1 text-ash-500">
                      {i.available ? 'Live' : 'Soon'}
                    </p>
                  </div>
                </div>
                <p className="mt-3.5 text-xs leading-relaxed text-ash-500">{i.reads}</p>
              </Panel>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" className="scroll-mt-20 border-t border-white/6 px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="label-mono text-flux-400">Pricing</p>
            <h2 className="mt-4 text-3xl sm:text-4xl">Start free. Upgrade when it stings.</h2>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {TIERS.map((tier) => (
              <Panel
                key={tier.name}
                glow={tier.featured}
                className={cn('flex h-full flex-col p-6', tier.featured && 'border-signal-400/30')}
              >
                <div className="mb-4 h-6">
                  {tier.featured && <Badge tone="signal">Most picked</Badge>}
                </div>
                <h3 className="text-lg">{tier.name}</h3>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-mono text-4xl font-medium text-white">{tier.price}</span>
                  <span className="text-sm text-ash-500">{tier.cadence}</span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-ash-400">{tier.description}</p>

                <ul className="mt-6 flex-1 space-y-2.5">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ash-300">
                      <Check className="mt-0.5 size-4 shrink-0 text-signal-400" strokeWidth={2} />
                      {f}
                    </li>
                  ))}
                </ul>

                <ButtonLink
                  to={tier.to}
                  variant={tier.featured ? 'primary' : 'outline'}
                  className="mt-7 w-full"
                >
                  {tier.cta}
                </ButtonLink>
              </Panel>
            ))}
          </div>

          <Panel className="mt-5 flex flex-col items-start justify-between gap-5 p-6 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg">Campus and career centers</h3>
              <p className="mt-2 max-w-xl text-sm text-ash-400">
                License Hablytics for your students and get a defensible read on whether your
                graduates are actually job-ready.
              </p>
            </div>
            <ButtonLink to="/signup" variant="outline" className="shrink-0">
              Talk to us
            </ButtonLink>
          </Panel>
        </div>
      </section>

      <section className="border-t border-white/6 px-5 py-28">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl sm:text-5xl">
            Find out now, not after
            <br />
            <span className="text-gradient">the fourth rejection.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-lg text-ash-400">
            Connect one source. Get your first read in minutes. Nobody else is going to tell you
            this.
          </p>
          <div className="mt-9 flex justify-center">
            <ButtonLink to="/signup" size="lg">
              Run my first scan
              <ArrowRight className="size-4" strokeWidth={2} />
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-ash-500">
            Already using it?{' '}
            <Link to="/login" className="text-signal-400 hover:text-signal-300">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </>
  )
}
