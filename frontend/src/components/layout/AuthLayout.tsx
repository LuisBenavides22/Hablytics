import type { ReactNode } from 'react'
import { Logo } from '@/components/Logo'
import { Panel } from '@/components/ui/Panel'

interface AuthLayoutProps {
  eyebrow: string
  title: string
  subtitle: string
  children: ReactNode
  footer?: ReactNode
}

export function AuthLayout({ eyebrow, title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 py-12">
      <div className="w-full max-w-md animate-rise">
        <div className="mb-8 flex justify-center">
          <Logo />
        </div>

        <Panel glow className="hairline-top p-7 sm:p-8">
          <p className="label-mono text-signal-400">{eyebrow}</p>
          <h1 className="mt-3 text-2xl">{title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-ash-400">{subtitle}</p>

          <div className="mt-7">{children}</div>
        </Panel>

        {footer && <div className="mt-6 text-center text-sm text-ash-400">{footer}</div>}
      </div>
    </div>
  )
}
