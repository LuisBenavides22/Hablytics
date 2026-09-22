import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'error' | 'success'

const tones: Record<Tone, string> = {
  error: 'border-red-900/60 bg-red-950/30 text-red-300',
  success: 'border-emerald-900/60 bg-emerald-950/30 text-emerald-300',
}

interface FormAlertProps {
  tone?: Tone
  children: ReactNode
}

export function FormAlert({ tone = 'error', children }: FormAlertProps) {
  return (
    <div
      role={tone === 'error' ? 'alert' : 'status'}
      className={cn('rounded-md border px-3 py-2 text-sm leading-relaxed', tones[tone])}
    >
      {children}
    </div>
  )
}
