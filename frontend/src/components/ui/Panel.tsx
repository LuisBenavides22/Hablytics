import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface PanelProps {
  children: ReactNode
  className?: string
  glow?: boolean
  as?: 'div' | 'section' | 'article' | 'aside'
}

export function Panel({ children, className, glow = false, as: Tag = 'div' }: PanelProps) {
  return (
    <Tag
      className={cn(
        'relative overflow-hidden rounded-2xl glass',
        glow && 'shadow-[0_0_60px_-25px_var(--color-signal-400)]',
        className,
      )}
    >
      {children}
    </Tag>
  )
}

interface PanelHeaderProps {
  label: string
  title?: string
  action?: ReactNode
  className?: string
}

export function PanelHeader({ label, title, action, className }: PanelHeaderProps) {
  return (
    <div
      className={cn(
        'flex items-start justify-between gap-4 border-b border-white/6 px-5 py-4',
        className,
      )}
    >
      <div className="min-w-0">
        <p className="label-mono text-signal-400/80">{label}</p>
        {title && <h3 className="mt-2 text-base leading-tight">{title}</h3>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
