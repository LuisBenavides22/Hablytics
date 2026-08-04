import type { Platform } from '@/types'
import { INTEGRATION_BY_PLATFORM } from '@/lib/integrations'
import { cn } from '@/lib/cn'

interface PlatformMarkProps {
  platform: Platform
  size?: 'sm' | 'md'
  className?: string
}

export function PlatformMark({ platform, size = 'md', className }: PlatformMarkProps) {
  const meta = INTEGRATION_BY_PLATFORM[platform]

  return (
    <span
      className={cn(
        'grid shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 font-mono font-medium',
        size === 'sm' ? 'size-8 text-[0.6rem]' : 'size-11 text-xs',
        className,
      )}
      style={{ color: meta?.accent ?? 'var(--color-ash-300)' }}
      aria-hidden
    >
      {meta?.monogram ?? '??'}
    </span>
  )
}
