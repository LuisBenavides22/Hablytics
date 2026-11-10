import { useState } from 'react'
import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes } from 'react'
import { ChevronDown, Eye, EyeOff } from 'lucide-react'
import { cn } from '@/lib/cn'

/**
 * `default` puts the label above a compact control. `filled` is the auth-page
 * style: a taller filled control whose placeholder carries the label.
 */
type Variant = 'default' | 'filled'

const controls: Record<Variant, string> = {
  default:
    'w-full rounded-md border border-line bg-surface px-3 text-sm text-fg transition-colors placeholder:text-fg-faint hover:border-line-strong focus:border-fg-faint focus:outline-none h-10',
  filled:
    'w-full rounded-lg border border-transparent bg-raised px-4 text-[0.9375rem] text-fg transition-colors placeholder:text-fg-subtle hover:border-line-strong focus:border-fg-muted focus:outline-none h-12',
}

const invalid = 'border-red-800 hover:border-red-800 focus:border-red-700'

interface FieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label: string
  hint?: ReactNode
  error?: string
  className?: string
  variant?: Variant
}

export function Field({
  label,
  hint,
  error,
  className,
  id,
  variant = 'default',
  type,
  placeholder,
  ...rest
}: FieldProps) {
  const [revealed, setRevealed] = useState(false)
  const fieldId = id ?? `f-${label.toLowerCase().replace(/\s+/g, '-')}`
  const filled = variant === 'filled'
  // Filled password fields get a show/hide toggle.
  const toggle = filled && type === 'password'

  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={fieldId} className={filled ? 'sr-only' : 'label-mono block'}>
        {label}
      </label>
      <div className="relative">
        <input
          id={fieldId}
          type={toggle && revealed ? 'text' : type}
          placeholder={filled ? placeholder || label : placeholder}
          className={cn(controls[variant], toggle && 'pr-12', error && invalid)}
          aria-invalid={error ? true : undefined}
          {...rest}
        />
        {toggle && (
          <button
            type="button"
            onClick={() => setRevealed((v) => !v)}
            aria-label={revealed ? 'Hide password' : 'Show password'}
            aria-pressed={revealed}
            className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-fg-subtle transition-colors hover:text-fg"
          >
            {revealed ? (
              <EyeOff className="size-[1.125rem]" strokeWidth={1.75} />
            ) : (
              <Eye className="size-[1.125rem]" strokeWidth={1.75} />
            )}
          </button>
        )}
      </div>
      {error ? (
        <p className="text-xs leading-relaxed text-red-400">{error}</p>
      ) : (
        hint && <p className="text-xs leading-relaxed text-fg-faint">{hint}</p>
      )}
    </div>
  )
}

interface SelectFieldProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'className'> {
  label: string
  className?: string
  children: ReactNode
  variant?: Variant
}

export function SelectField({
  label,
  className,
  children,
  id,
  variant = 'default',
  ...rest
}: SelectFieldProps) {
  const fieldId = id ?? `s-${label.toLowerCase().replace(/\s+/g, '-')}`
  const filled = variant === 'filled'
  return (
    <div className={cn('space-y-2', className)}>
      <label htmlFor={fieldId} className={filled ? 'sr-only' : 'label-mono block'}>
        {label}
      </label>
      <div className="relative">
        <select
          id={fieldId}
          className={cn(
            controls[variant],
            'appearance-none',
            filled ? 'pr-11' : 'pr-9',
            // An unchosen select reads like a placeholder.
            filled && rest.value === '' && 'text-fg-subtle',
          )}
          {...rest}
        >
          {children}
        </select>
        <ChevronDown
          className={cn(
            'pointer-events-none absolute top-1/2 -translate-y-1/2 text-fg-faint',
            filled ? 'right-4 size-4' : 'right-3 size-3.5',
          )}
          strokeWidth={1.5}
        />
      </div>
    </div>
  )
}
