import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

const control =
  'w-full rounded-xl border border-white/10 bg-white/4 px-4 text-[0.95rem] text-white transition-colors placeholder:text-ash-500 hover:border-white/16 focus:border-signal-400/60 focus:bg-white/6 focus:outline-none'

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string
  hint?: ReactNode
  className?: string
}

export function Field({ label, hint, className, id, ...rest }: FieldProps) {
  const fieldId = id ?? `f-${label.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={fieldId} className="label-mono block text-ash-400">
        {label}
      </label>
      <input id={fieldId} className={cn(control, 'h-11')} {...rest} />
      {hint && <p className="text-xs text-ash-500">{hint}</p>}
    </div>
  )
}

interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  label: string
  className?: string
  children: ReactNode
}

export function SelectField({ label, className, children, id, ...rest }: SelectFieldProps) {
  const fieldId = id ?? `s-${label.toLowerCase().replace(/\s+/g, '-')}`
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={fieldId} className="label-mono block text-ash-400">
        {label}
      </label>
      <div className="relative">
        <select id={fieldId} className={cn(control, 'h-11 appearance-none pr-10')} {...rest}>
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-ash-500"
          strokeWidth={1.75}
        />
      </div>
    </div>
  )
}
