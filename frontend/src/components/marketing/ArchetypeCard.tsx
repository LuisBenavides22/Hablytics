import type { ReactNode } from 'react'
import { Lock } from 'lucide-react'
import { Panel } from '@/components/ui/Panel'
import { SAMPLE_PROFILE } from '@/lib/marketing'
import { cn } from '@/lib/cn'

/** Text that is on the page but unreadable until the visitor is on Pro. */
export function Locked({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <>
      <span aria-hidden className={cn('select-none blur-[5px]', className)}>
        {children}
      </span>
      <span className="sr-only">Locked. Available on Pro.</span>
    </>
  )
}

export function ProTag({ children = 'Pro' }: { children?: ReactNode }) {
  return (
    <span className="label-mono inline-flex shrink-0 items-center gap-1.5">
      <Lock className="size-3 text-accent" strokeWidth={2} aria-hidden />
      {children}
    </span>
  )
}

interface ArchetypeCardProps {
  className?: string
  /** Show the whole card, only the type and traits, or only the locked rows. */
  part?: 'all' | 'summary' | 'locked'
}

export function ArchetypeCard({ className, part = 'all' }: ArchetypeCardProps) {
  const { field, archetype, tagline, traits, signals, locked } = SAMPLE_PROFILE

  return (
    <Panel className={cn('text-left shadow-[0_24px_80px_-24px_rgb(0_0_0/0.8)]', className)}>
      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
        <p className="label-mono">Sample profile</p>
        <p className="label-mono">{field}</p>
      </div>

      {part !== 'locked' && (
        <>
          <div className="px-5 pt-6 pb-5">
            <p className="label-mono">Your type</p>
            <p className="mt-3 text-3xl leading-tight font-medium tracking-tight text-accent">
              {archetype}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">{tagline}</p>
          </div>

          <div className="grid gap-px border-t border-line bg-line text-left sm:grid-cols-2">
            {traits.map((trait) => (
              <div key={trait.title} className="bg-surface px-5 py-4">
                <p
                  className={cn(
                    'label-mono',
                    trait.tone === 'positive' ? 'text-positive' : 'text-attention',
                  )}
                >
                  {trait.label}
                </p>
                <p className="mt-2.5 text-sm text-fg">{trait.title}</p>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-fg-subtle">
                  {trait.body}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {part !== 'summary' && (
        <>
          <ul className="space-y-3 border-t border-line px-5 py-5 first:border-t-0">
            {signals.map((signal) => (
              <li key={signal.label} className="flex items-center gap-4">
                <span className="w-28 shrink-0 text-[0.8125rem] text-fg-muted">{signal.label}</span>
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-line">
                  <span
                    className={cn(
                      'block h-full rounded-full',
                      signal.locked ? 'bg-fg-faint blur-[3px]' : 'bg-fg',
                    )}
                    style={{ width: `${signal.value}%` }}
                  />
                </span>
                <span className="w-8 shrink-0 text-right font-mono text-xs text-fg-muted">
                  {signal.locked ? (
                    <Lock className="ml-auto size-3 text-accent" aria-label="Locked" />
                  ) : (
                    signal.value
                  )}
                </span>
              </li>
            ))}
          </ul>

          <ul className="border-t border-line">
            {locked.map((row) => (
              <li key={row.title} className="border-b border-line px-5 py-3.5 last:border-b-0">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-fg">{row.title}</p>
                  <ProTag />
                </div>
                <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-fg-muted">
                  <Locked>{row.body}</Locked>
                </p>
              </li>
            ))}
          </ul>
        </>
      )}
    </Panel>
  )
}
