import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface PanelProps {
  children: ReactNode
  className?: string
  as?: 'div' | 'section' | 'article' | 'aside'
}

export function Panel({ children, className, as: Tag = 'div' }: PanelProps) {
  return (
    <Tag className={cn('relative overflow-hidden rounded-lg surface lit-top', className)}>
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
      className={cn('flex items-start justify-between gap-4 border-b border-line px-5 py-4', className)}
    >
      <div className="min-w-0">
        <p className="label-mono">{label}</p>
        {title && <h3 className="mt-2 text-[0.9375rem] leading-tight">{title}</h3>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  )
}
