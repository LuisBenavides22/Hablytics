import { useState } from 'react'
import { Check } from 'lucide-react'
import { ArchetypeCard } from '@/components/marketing/ArchetypeCard'
import { PlatformTile } from '@/components/PlatformLogo'
import { INTEGRATIONS } from '@/lib/integrations'
import { HOME_STEPS } from '@/lib/marketing'
import { cn } from '@/lib/cn'

const EVIDENCE = [
  'Commits and pull requests',
  'Review comments',
  'Docs and specs',
  'Threads and replies',
]

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="grid w-full max-w-sm grid-cols-2 gap-2.5">
        {INTEGRATIONS.map((i) => (
          <div
            key={i.platform}
            className="flex items-center gap-2.5 rounded-xl border border-line bg-void px-3 py-2.5"
          >
            <PlatformTile platform={i.platform} size="sm" />
            <div className="min-w-0 text-left">
              <p className="truncate text-[0.8125rem] text-fg">{i.name}</p>
              <p className={cn('label-mono mt-1', i.available && 'text-positive')}>
                {i.available ? 'Live' : 'Soon'}
              </p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (index === 1) {
    return (
      <ul className="w-full max-w-sm space-y-2.5">
        {EVIDENCE.map((line) => (
          <li
            key={line}
            className="flex items-center justify-between gap-4 rounded-xl border border-line bg-void px-4 py-3.5 text-sm text-fg"
          >
            {line}
            <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent text-void">
              <Check className="size-3" strokeWidth={3} aria-hidden />
            </span>
          </li>
        ))}
        <li className="label-mono pt-2 text-center">Read only. Nothing is written back.</li>
      </ul>
    )
  }

  return <ArchetypeCard part={index === 2 ? 'summary' : 'locked'} className="w-full max-w-sm" />
}

/** Big visual on the left, steps on the right. The visual follows the selected step. */
export function StepsShowcase() {
  const [active, setActive] = useState(0)

  return (
    <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
      <div className="relative flex min-h-[26rem] items-center justify-center overflow-hidden rounded-3xl border border-line bg-surface p-6 sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(232_162_61/0.13),transparent_55%)]"
        />
        <div key={active} className="relative flex w-full animate-rise justify-center">
          <StepVisual index={active} />
        </div>
      </div>

      <ol className="flex flex-col justify-center gap-2">
        {HOME_STEPS.map(({ step, title, body }, i) => {
          const selected = i === active
          return (
            <li key={step}>
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                aria-current={selected ? 'step' : undefined}
                className={cn(
                  'w-full rounded-2xl border border-t-2 px-5 py-4 text-left transition-colors duration-200',
                  selected
                    ? 'border-line border-t-accent bg-surface'
                    : 'border-transparent hover:bg-surface/60',
                )}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={cn(
                      'grid size-6 shrink-0 place-items-center rounded-full font-mono text-[0.6875rem]',
                      selected ? 'bg-accent text-void' : 'bg-raised text-fg-muted',
                    )}
                  >
                    {i + 1}
                  </span>
                  <span className="text-base font-medium text-fg">{title}</span>
                </span>
                <span className="mt-2 block text-sm leading-relaxed text-fg-muted">{body}</span>
              </button>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
