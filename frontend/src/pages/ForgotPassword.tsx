import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AuthLayout } from '@/components/layout/AuthLayout'
import { Field } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'

export function ForgotPassword() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  return (
    <AuthLayout
      eyebrow="Password reset"
      title="Forgot your password?"
      subtitle="Enter your email and we'll send a reset link. It expires in 15 minutes."
      footer={
        <Link to="/login" className="text-signal-400 hover:text-signal-300">
          Back to log in
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <Field label="Email" name="email" type="email" autoComplete="email" placeholder="you@school.edu" />
        <Button type="submit" size="lg" className="w-full">
          Send reset link
        </Button>
      </form>
    </AuthLayout>
  )
}
