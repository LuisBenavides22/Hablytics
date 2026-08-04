import { ButtonLink } from '@/components/ui/Button'
import { Logo } from '@/components/Logo'

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <Logo />
      <p className="label-mono mt-10 text-signal-400">Error 404</p>
      <h1 className="mt-4 text-4xl">No signal here</h1>
      <p className="mt-3 max-w-sm text-ash-400">
        That page doesn't exist, or it moved somewhere we can't read.
      </p>
      <ButtonLink to="/" className="mt-8">
        Back to safety
      </ButtonLink>
    </div>
  )
}
