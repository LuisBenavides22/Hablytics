import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'default' | 'positive' | 'attention'

const tones: Record<Tone, string> = {
  default: 'border-line-strong text-fg-subtle',
  positive: 'border-line-strong text-positive',
  attention: 'border-line-strong text-attention',
}

interface BadgeProps {
  children: ReactNode
  tone?: Tone
  className?: string
}

export function Badge({ children, tone = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn('inline-flex items-center rounded border px-2 py-1 label-mono', tones[tone], className)}
    >
      {children}
    </span>
  )
}
