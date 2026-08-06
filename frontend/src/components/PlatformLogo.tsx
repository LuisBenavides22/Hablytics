import type { Platform } from '@/types'
import { BRAND_MARKS } from '@/lib/brandMarks'
import { cn } from '@/lib/cn'

const MICROSOFT_SQUARES = [
  { x: 1, y: 1, fill: '#F25022' },
  { x: 12.5, y: 1, fill: '#7FBA00' },
  { x: 1, y: 12.5, fill: '#00A4EF' },
  { x: 12.5, y: 12.5, fill: '#FFB900' },
]

// GitHub and Notion are near-black in brand color, invisible on a black surface.
const ON_DARK_OVERRIDE: Partial<Record<Platform, string>> = {
  GITHUB: '#f5f5f5',
  NOTION: '#f5f5f5',
}

interface PlatformLogoProps {
  platform: Platform
  className?: string
}

export function PlatformLogo({ platform, className }: PlatformLogoProps) {
  if (platform === 'MICROSOFT') {
    return (
      <svg viewBox="0 0 24 24" className={cn('size-5', className)} aria-hidden>
        {MICROSOFT_SQUARES.map((s) => (
          <rect key={s.fill} x={s.x} y={s.y} width={10.5} height={10.5} fill={s.fill} />
        ))}
      </svg>
    )
  }

  const mark = BRAND_MARKS[platform]
  if (!mark) return null

  return (
    <svg viewBox="0 0 24 24" className={cn('size-5', className)} aria-hidden>
      <path d={mark.path} fill={ON_DARK_OVERRIDE[platform] ?? mark.hex} />
    </svg>
  )
}

interface PlatformTileProps {
  platform: Platform
  size?: 'sm' | 'md'
  className?: string
}

export function PlatformTile({ platform, size = 'md', className }: PlatformTileProps) {
  return (
    <span
      className={cn(
        'grid shrink-0 place-items-center rounded-md border border-line bg-raised',
        size === 'sm' ? 'size-8' : 'size-10',
        className,
      )}
    >
      <PlatformLogo platform={platform} className={size === 'sm' ? 'size-4' : 'size-5'} />
    </span>
  )
}
