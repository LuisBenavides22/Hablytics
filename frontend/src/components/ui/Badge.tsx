import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'signal' | 'flux' | 'gap' | 'strong' | 'neutral'

const tones: Record<Tone, string> = {
  signal: 'border-signal-400/25 bg-signal-400/10 text-signal-300',
  flux: 'border-flux-400/25 bg-flux-400/10 text-flux-300',
  gap: 'border-gap-400/25 bg-gap-400/10 text-gap-300',
  strong: 'border-strong-400/25 bg-strong-400/10 text-strong-300',
  neutral: 'border-white/10 bg-white/5 text-ash-300',
}

interface BadgeProps {
  children: ReactNode
  tone?: Tone
  className?: string
  dot?: boolean
}

export function Badge({ children, tone = 'neutral', className, dot = false }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 label-mono',
        tones[tone],
        className,
      )}
    >
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  )
}
