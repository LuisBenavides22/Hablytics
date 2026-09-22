const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api'

/** Error thrown for any non-2xx response (or a network failure, with status 0). */
export class ApiError extends Error {
  readonly status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

type TokenGetter = () => string | null

let tokenGetter: TokenGetter = () => null
let unauthorizedHandler: () => void = () => {}

/** Registered by the auth layer so requests can attach the current bearer token. */
export function setTokenGetter(fn: TokenGetter): void {
  tokenGetter = fn
}

/** Registered by the auth layer so a 401 can drop the session. */
export function setUnauthorizedHandler(fn: () => void): void {
  unauthorizedHandler = fn
}

interface RequestOptions {
  body?: unknown
  /** Attach the bearer token when one is available. Defaults to true. */
  auth?: boolean
}

async function request<T>(method: string, path: string, options: RequestOptions = {}): Promise<T> {
  const { body, auth = true } = options
  const headers: Record<string, string> = {}

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  if (auth) {
    const token = tokenGetter()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }
  }

  let response: Response
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiError('Could not reach the server. Make sure the backend is running.', 0)
  }

  if (response.status === 401) {
    unauthorizedHandler()
  }

  const contentType = response.headers.get('content-type') ?? ''
  const payload: unknown = contentType.includes('application/json')
    ? await response.json().catch(() => null)
    : null

  if (!response.ok) {
    throw new ApiError(extractError(payload) ?? `Request failed (${response.status})`, response.status)
  }

  return payload as T
}

function extractError(payload: unknown): string | null {
  if (payload && typeof payload === 'object' && 'error' in payload) {
    const { error } = payload as { error: unknown }
    if (typeof error === 'string') {
      return error
    }
  }
  return null
}

export const api = {
  get: <T>(path: string, options?: RequestOptions) => request<T>('GET', path, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('POST', path, { ...options, body }),
  put: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>('PUT', path, { ...options, body }),
  del: <T>(path: string, options?: RequestOptions) => request<T>('DELETE', path, options),
}
