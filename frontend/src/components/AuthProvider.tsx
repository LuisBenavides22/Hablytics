import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  AuthContext,
  clearStoredAuth,
  readStoredAuth,
  writeStoredAuth,
} from '@/lib/auth'
import type { AuthUser, SignupInput } from '@/lib/auth'
import { api, setTokenGetter, setUnauthorizedHandler } from '@/lib/api'

interface LoginResponse {
  success: boolean
  token: string
  user: AuthUser
}

interface SignupResponse {
  success: boolean
  user: AuthUser
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [{ token, user }, setAuth] = useState(() => readStoredAuth())

  useEffect(() => {
    setTokenGetter(() => token)
  }, [token])

  const logout = useCallback(() => {
    clearStoredAuth()
    setAuth({ token: null, user: null })
  }, [])

  useEffect(() => {
    setUnauthorizedHandler(logout)
  }, [logout])

  const login = useCallback(async (email: string, password: string) => {
    const res = await api.post<LoginResponse>('/auth/login', { email, password }, { auth: false })
    writeStoredAuth(res.token, res.user)
    setAuth({ token: res.token, user: res.user })
  }, [])

  const signup = useCallback(async (input: SignupInput) => {
    // The signup endpoint creates the account but does not return a token,
    // so log in with the same credentials to start the session.
    await api.post<SignupResponse>('/auth/signup', input, { auth: false })
    const res = await api.post<LoginResponse>(
      '/auth/login',
      { email: input.email, password: input.password },
      { auth: false },
    )
    writeStoredAuth(res.token, res.user)
    setAuth({ token: res.token, user: res.user })
  }, [])

  const value = useMemo(
    () => ({ user, token, isAuthenticated: Boolean(token), login, signup, logout }),
    [user, token, login, signup, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
