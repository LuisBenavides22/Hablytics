import { createContext, useContext } from 'react'

/** The user shape returned by the auth endpoints (a subset of the full User). */
export interface AuthUser {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  role: string | null
}

export interface SignupInput {
  firstName: string
  lastName: string
  email: string
  role: string
  password: string
  confirmPassword: string
}

export interface AuthContextValue {
  user: AuthUser | null
  token: string | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (input: SignupInput) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an <AuthProvider>')
  }
  return ctx
}

const TOKEN_KEY = 'hablytics.token'
const USER_KEY = 'hablytics.user'

export function readStoredAuth(): { token: string | null; user: AuthUser | null } {
  try {
    const token = localStorage.getItem(TOKEN_KEY)
    const rawUser = localStorage.getItem(USER_KEY)
    return {
      token: token ?? null,
      user: rawUser ? (JSON.parse(rawUser) as AuthUser) : null,
    }
  } catch {
    return { token: null, user: null }
  }
}

export function writeStoredAuth(token: string, user: AuthUser): void {
  try {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  } catch {
    /* storage unavailable — the session stays in memory for this tab only */
  }
}

export function clearStoredAuth(): void {
  try {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  } catch {
    /* nothing to clean up */
  }
}
