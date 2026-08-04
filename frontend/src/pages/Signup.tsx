import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Field, SelectField } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'

const ROLES = [
  'Student',
  'Software Engineer',
  'Data / Analytics',
  'Product',
  'Design',
  'Finance',
  'Marketing',
  'Operations',
  'Other',
]

export function Signup() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <AuthLayout
      eyebrow="Get started"
      title="Create your account"
      subtitle="Connect one source and get your first honest read."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-signal-400 hover:text-signal-300">
            Log in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name" name="firstName" autoComplete="given-name" placeholder="Alex" />
          <Field label="Last name" name="lastName" autoComplete="family-name" placeholder="Rivera" />
        </div>

        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@school.edu" />

        <SelectField label="Where you are now" name="role" defaultValue="">
          <option value="" disabled>
            Select a role
          </option>
          {ROLES.map((r) => (
            <option key={r} value={r} className="bg-carbon">
              {r}
            </option>
          ))}
        </SelectField>

        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••••"
          hint="At least 8 characters, with upper, lower, a number, and a symbol."
        />

        <Button type="submit" size="lg" className="w-full">
          Create account
        </Button>

        <p className="text-center text-xs leading-relaxed text-ash-500">
          Read-only access to whatever you connect. Disconnect any source at any time.
        </p>
      </form>
    </AuthLayout>
  )
}
