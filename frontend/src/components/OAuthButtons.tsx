import { useState } from 'react'

type Provider = 'Google' | 'Apple'

/** Google's four-color "G", as published in its sign-in branding guidelines. */
function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-5" aria-hidden>
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  )
}

/** Apple's mark is single color; white is its approved form on dark surfaces. */
function AppleMark() {
  return (
    <svg viewBox="0 0 24 24" className="size-5 -translate-y-px" fill="#ffffff" aria-hidden>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  )
}

const PROVIDERS: { name: Provider; mark: () => React.JSX.Element }[] = [
  { name: 'Google', mark: GoogleMark },
  { name: 'Apple', mark: AppleMark },
]

interface OAuthButtonsProps {
  /** Divider text, e.g. "Or register with". */
  label: string
  disabled?: boolean
}

/**
 * Google and Apple sign-in buttons. Interface only: there is no OAuth flow on the
 * server yet, so choosing a provider says so instead of pretending to start one.
 * Wire `start` to the real redirect once the backend routes exist.
 */
export function OAuthButtons({ label, disabled }: OAuthButtonsProps) {
  const [notice, setNotice] = useState<string | null>(null)

  function start(provider: Provider) {
    setNotice(`${provider} sign-in is not available yet. Please use your email for now.`)
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        <span className="h-px flex-1 bg-line-strong" />
        <span className="text-sm text-fg-subtle">{label}</span>
        <span className="h-px flex-1 bg-line-strong" />
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {PROVIDERS.map(({ name, mark: Mark }) => (
          <button
            key={name}
            type="button"
            onClick={() => start(name)}
            disabled={disabled}
            className="inline-flex h-12 items-center justify-center gap-3 rounded-lg border border-line-strong text-[0.9375rem] font-medium text-fg transition-colors hover:border-fg-faint hover:bg-raised active:bg-line disabled:pointer-events-none disabled:opacity-40"
          >
            <Mark />
            {name}
          </button>
        ))}
      </div>

      {notice && (
        <p role="status" className="mt-4 text-center text-sm text-fg-muted">
          {notice}
        </p>
      )}
    </div>
  )
}
