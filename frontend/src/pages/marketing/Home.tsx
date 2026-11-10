import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Award,
  Calendar,
  Check,
  Compass,
  Eye,
  Fingerprint,
  Lock,
  MessageSquare,
  Target,
  Trophy,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react'
import { CtaButton } from '@/components/marketing/CtaButton'
import { Faq } from '@/components/marketing/Faq'
import { Marquee } from '@/components/marketing/Marquee'
import { MarketingCta } from '@/components/marketing/MarketingCta'
import { ProfileSections } from '@/components/marketing/ProfileSections'
import { StepsShowcase } from '@/components/marketing/StepsShowcase'
import { PlatformTile } from '@/components/PlatformLogo'
import { INTEGRATIONS } from '@/lib/integrations'
import {
  FREE_READ_POINTS,
  HERO_PROOF,
  HOME_STEPS,
  PAINS,
  PROFILE_CARDS,
  SAMPLE_PROFILE,
} from '@/lib/marketing'
import { cn } from '@/lib/cn'

const PAIN_ICONS: LucideIcon[] = [MessageSquare, Trophy, Compass]
const PROFILE_ICONS: LucideIcon[] = [
  Fingerprint,
  Award,
  Eye,
  Trophy,
  MessageSquare,
  Users,
  Calendar,
  Target,
]
const DOUBTS = ['Vague reviews', 'Passed over', 'Busy, not noticed', 'No idea what to fix']

function SectionHeading({ title, lead }: { title: string; lead?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl leading-[1.12] sm:text-[2.5rem]">{title}</h2>
      {lead && <p className="mx-auto mt-5 max-w-xl text-fg-muted">{lead}</p>}
    </div>
  )
}

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="grid size-10 place-items-center rounded-xl border border-line bg-raised text-accent">
      <Icon className="size-[1.125rem]" strokeWidth={1.75} aria-hidden />
    </span>
  )
}

interface StartCardProps {
  title: string
  body: string
  action: ReactNode
  children: ReactNode
}

function StartCard({ title, body, action, children }: StartCardProps) {
  return (
    <div className="flex flex-col rounded-3xl border border-line bg-surface p-5 text-center">
      <div className="px-2 pt-4">
        <h3 className="text-xl leading-snug">{title}</h3>
        <p className="mx-auto mt-3 max-w-[17rem] text-sm leading-relaxed text-fg-muted">{body}</p>
        <div className="mt-6 flex justify-center">{action}</div>
      </div>
      <div className="relative mt-8 min-h-56 flex-1 overflow-hidden rounded-2xl border border-line bg-void">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(232_162_61/0.16),transparent_60%)]"
        />
        {children}
      </div>
    </div>
  )
}

export function Home() {
  return (
    <>
      {/* Hero: fills the first screen (viewport minus the 4.25rem nav), copy centered, proof row pinned low. */}
      <section className="relative flex min-h-[calc(100svh-4.25rem)] flex-col overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[65%] bg-[radial-gradient(65%_100%_at_50%_100%,rgb(232_162_61/0.2),transparent)]"
        />

        <div className="relative mx-auto my-auto w-full max-w-5xl animate-rise px-5 py-12 text-center">
          <h1 className="mx-auto max-w-3xl text-[2.5rem] leading-[1.06] sm:text-6xl">
            Your resume says one thing. Your work says another.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-fg-muted">
            Connect the work you actually produce. In a few minutes Hablytics tells you what kind of
            worker you are, what is carrying you, and the one habit that gives you away.
          </p>

          <div className="mt-9 flex justify-center">
            <CtaButton to="/signup">See my type</CtaButton>
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="flex">
              {INTEGRATIONS.slice(0, 4).map((i) => (
                <PlatformTile
                  key={i.platform}
                  platform={i.platform}
                  size="sm"
                  className="-ml-2 !rounded-full border-line-strong first:ml-0"
                />
              ))}
            </div>
            <Link
              to="/sample"
              className="text-sm text-fg underline decoration-fg-faint underline-offset-4 transition-colors hover:decoration-accent"
            >
              See a sample profile
            </Link>
          </div>
        </div>

        <div className="relative mx-auto grid max-w-5xl w-full gap-8 px-5 pt-4 pb-14 sm:grid-cols-3">
          {HERO_PROOF.map((line) => (
            <div key={line}>
              <span className="grid size-7 place-items-center rounded-full bg-fg text-void">
                <Check className="size-4" strokeWidth={3} aria-hidden />
              </span>
              <p className="mt-4 text-lg leading-snug font-medium text-fg">{line}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Source strip */}
      <section className="border-y border-line bg-void/60 py-12">
        <p className="text-center text-sm text-fg-muted">
          Reads from where your work already lives
        </p>
        <Marquee className="mx-auto mt-7 max-w-5xl">
          {INTEGRATIONS.map((i) => (
            <span key={i.platform} className="flex items-center gap-2.5 px-5">
              <PlatformTile
                platform={i.platform}
                size="sm"
                className="border-transparent bg-transparent"
              />
              <span className="text-base font-medium whitespace-nowrap text-fg-muted">
                {i.name}
              </span>
            </span>
          ))}
        </Marquee>
      </section>

      {/* Start where you are */}
      <section className="px-5 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeading title="Start where you are. The read meets you there." />

          <div className="mt-14 grid gap-4 lg:grid-cols-3">
            <StartCard
              title="I have a feeling something is off"
              body="You work hard, the feedback is vague, and you cannot say why it is not landing."
              action={
                <CtaButton to="/how-it-works" variant="outline" size="sm">
                  See how it works
                </CtaButton>
              }
            >
              <ul className="relative space-y-2 p-4 text-left">
                {DOUBTS.map((doubt) => (
                  <li
                    key={doubt}
                    className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-3"
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-attention text-void">
                      <X className="size-3" strokeWidth={3} aria-hidden />
                    </span>
                    <span className="text-[0.8125rem] text-fg">{doubt}</span>
                  </li>
                ))}
              </ul>
            </StartCard>

            <StartCard
              title="I want to see what a read looks like"
              body="Look at a full sample profile before you connect anything of your own."
              action={
                <CtaButton to="/sample" variant="outline" size="sm">
                  See a sample profile
                </CtaButton>
              }
            >
              <ul className="relative space-y-2 p-4 text-left">
                {HOME_STEPS.slice(0, 3).map(({ step, title }, i) => (
                  <li
                    key={step}
                    className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3.5 py-3"
                  >
                    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent font-mono text-[0.625rem] text-void">
                      {i + 1}
                    </span>
                    <span className="text-[0.8125rem] text-fg">{title}</span>
                  </li>
                ))}
              </ul>
            </StartCard>

            <StartCard
              title="I am ready to see my type"
              body="Connect one source and get your first read in a few minutes."
              action={
                <CtaButton to="/signup" size="sm">
                  See my type
                </CtaButton>
              }
            >
              <div className="relative m-4 rounded-xl border border-line bg-surface p-4 text-left">
                <p className="label-mono">Sample · Your type</p>
                <p className="mt-2.5 text-xl font-medium tracking-tight text-accent">
                  {SAMPLE_PROFILE.archetype}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {SAMPLE_PROFILE.signals.map((signal) => (
                    <li key={signal.label} className="flex items-center gap-3">
                      <span className="w-24 shrink-0 text-xs text-fg-muted">{signal.label}</span>
                      <span className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                        <span
                          className={cn(
                            'block h-full rounded-full',
                            signal.locked ? 'bg-fg-faint blur-[3px]' : 'bg-fg',
                          )}
                          style={{ width: `${signal.value}%` }}
                        />
                      </span>
                      {signal.locked && <Lock className="size-3 text-accent" aria-hidden />}
                    </li>
                  ))}
                </ul>
              </div>
            </StartCard>
          </div>
        </div>
      </section>

      {/* The problem */}
      <section className="px-5 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            title="Nobody tells you how you actually work."
            lead="Managers are busy, peers are polite, and you are too close to see it. If any of this sounds familiar, you are not alone."
          />

          <div className="mt-14 grid gap-10 text-center sm:grid-cols-3">
            {PAINS.map(({ title, body }, i) => (
              <div key={title} className="flex flex-col items-center">
                <IconTile icon={PAIN_ICONS[i]} />
                <h3 className="mt-5 text-lg">{title}</h3>
                <p className="mt-2.5 max-w-[17rem] text-sm leading-relaxed text-fg-muted">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CtaButton to="/signup">See my type</CtaButton>
            <CtaButton to="/how-it-works" variant="outline">
              See how it works
            </CtaButton>
          </div>
        </div>
      </section>

      {/* What the profile contains */}
      <section className="relative px-5 py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-1/4 bottom-1/4 bg-[radial-gradient(50%_50%_at_50%_50%,rgb(232_162_61/0.09),transparent)]"
        />
        <div className="relative mx-auto max-w-5xl">
          <SectionHeading
            title="What your profile tells you"
            lead="Every part points at something specific in your own work. The first three are free."
          />

          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {PROFILE_CARDS.map(({ title, body, plan }, i) => (
              <div key={title} className="rounded-2xl border border-line bg-surface p-6">
                <div className="flex items-start justify-between gap-4">
                  <IconTile icon={PROFILE_ICONS[i]} />
                  <span
                    className={cn(
                      'label-mono inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1.5',
                      plan === 'Free' && 'text-positive',
                    )}
                  >
                    {plan !== 'Free' && <Lock className="size-3 text-accent" aria-hidden />}
                    {plan}
                  </span>
                </div>
                <h3 className="mt-5 text-xl">{title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-fg-muted">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex justify-center">
            <CtaButton to="/sample" variant="outline">
              See the full sample profile
            </CtaButton>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="px-5 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeading title="A clear four step path to knowing your type." />

          <div className="mt-14">
            <StepsShowcase />
          </div>

          <div className="mx-auto mt-12 max-w-xl text-center text-fg-muted">
            <p>
              Your type is free. Pro is $12 a month and opens the full profile, and you can cancel
              at any time.
            </p>
            <Link
              to="/pricing"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-fg underline decoration-fg-faint underline-offset-4 hover:decoration-accent"
            >
              See pricing
              <ArrowRight className="size-3.5" strokeWidth={2} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* Free read */}
      <section className="px-5 py-12">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-accent/25 bg-raised px-6 py-16 text-center">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_0%,rgb(232_162_61/0.12),transparent)]"
          />
          <div className="relative">
            <h2 className="text-3xl sm:text-[2.5rem]">Your first read is free</h2>
            <p className="mx-auto mt-5 max-w-md text-fg-muted">
              No questions to answer. Connect one source and read what comes back.
            </p>

            <p className="mt-9 text-sm font-medium text-fg">What you will leave with:</p>
            <ul className="mx-auto mt-4 inline-flex flex-col gap-2.5 text-left">
              {FREE_READ_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-sm text-fg-muted">
                  <span className="grid size-4 shrink-0 place-items-center rounded-full bg-accent text-void">
                    <Check className="size-2.5" strokeWidth={3.5} aria-hidden />
                  </span>
                  {point}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex justify-center">
              <CtaButton to="/signup">See my type</CtaButton>
            </div>
            <p className="mt-5 text-sm text-fg-faint">
              Read only access. Revoke any source at any time.
            </p>
          </div>
        </div>
      </section>

      {/* What a read says */}
      <section className="px-5 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            title="What a read actually says"
            lead="Lines from a sample profile. The first finding in each section is free. The rest open on Pro."
          />
          <div className="mt-14">
            <ProfileSections />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 px-5 py-24">
        <div className="mx-auto max-w-5xl">
          <SectionHeading title="Frequently asked questions" />
          <div className="mt-12">
            <Faq />
          </div>
        </div>
      </section>

      <MarketingCta />
    </>
  )
}
