import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Field } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'

export function Login() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <AuthLayout
      title="Log in to Hablytics"
      subtitle="Pick up where your last read left off."
      card
      footer={
        <>
          No account yet?{' '}
          <Link to="/signup" className="link-accent">
            Create one
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@school.edu" />
        <Field
          label="Password"
          name="password"
          type="password"
          autoComplete="current-password"
          placeholder=""
        />

        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-fg-subtle hover:text-fg">
            Forgot password?
          </Link>
        </div>

        <Button type="submit" size="lg" className="w-full">
          Log in
        </Button>
      </form>
    </AuthLayout>
  )
}
