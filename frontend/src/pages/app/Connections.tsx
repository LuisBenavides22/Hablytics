import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'
import { Panel } from '@/components/ui/Panel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { FormAlert } from '@/components/ui/FormAlert'
import { PlatformTile } from '@/components/PlatformLogo'
import { INTEGRATIONS } from '@/lib/integrations'
import { api, ApiError } from '@/lib/api'
import type { Platform, WorkspaceConnection } from '@/types'

type ConnectionSummary = Pick<WorkspaceConnection, 'id' | 'platform' | 'createdAt'>

const AUDIENCE_LABEL: Record<string, string> = {
  college: 'Coursework',
  career: 'Workplace',
  both: 'Either',
}

export function Connections() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [connections, setConnections] = useState<ConnectionSummary[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pendingPlatform, setPendingPlatform] = useState<Platform | null>(null)
  const [justConnected] = useState(() => searchParams.get('connected') === 'github')

  useEffect(() => {
    if (searchParams.has('connected')) {
      setSearchParams(
        (prev) => {
          const next = new URLSearchParams(prev)
          next.delete('connected')
          return next
        },
        { replace: true },
      )
    }
    // Only ever needs to run once, on the redirect back from an OAuth callback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let cancelled = false

    api
      .get<{ connections: ConnectionSummary[] }>('/integrations')
      .then((res) => {
        if (!cancelled) setConnections(res.connections)
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof ApiError ? err.message : 'Could not load your connections.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const connectedPlatforms = new Set(connections.map((c) => c.platform))

  async function handleConnect(platform: Platform) {
    if (platform !== 'GITHUB') return
    setError(null)
    setPendingPlatform(platform)
    try {
      const { url } = await api.get<{ url: string }>('/integrations/github/redirect')
      window.location.href = url
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not start the GitHub connection.')
      setPendingPlatform(null)
    }
  }

  async function handleDisconnect(platform: Platform) {
    setError(null)
    setPendingPlatform(platform)
    try {
      await api.del('/integrations/deleteConnections', { body: { connection: platform } })
      setConnections((prev) => prev.filter((c) => c.platform !== platform))
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not disconnect that source.')
    } finally {
      setPendingPlatform(null)
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      <PageHeader
        title="Choose what we read"
        description="Every source is read only and scoped to what you approve. Disconnect any of them at any time."
      />

      {justConnected && (
        <div className="mb-4">
          <FormAlert tone="success">GitHub connected.</FormAlert>
        </div>
      )}
      {error && (
        <div className="mb-4">
          <FormAlert tone="error">{error}</FormAlert>
        </div>
      )}

      <Panel className="mb-4 p-5">
        <p className="text-sm text-fg">Your data stays yours</p>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-fg-subtle">
          Hablytics reads your work to generate your report. It is never sold, never shown to
          employers, and never used to identify you to another user.
        </p>
      </Panel>

      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
        {INTEGRATIONS.map((i) => {
          const isConnected = connectedPlatforms.has(i.platform)
          const isPending = pendingPlatform === i.platform

          return (
            <div key={i.platform} className="flex flex-col bg-surface p-5">
              <div className="flex items-start gap-4">
                <PlatformTile platform={i.platform} />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[0.9375rem]">{i.name}</h3>
                    <Badge>{AUDIENCE_LABEL[i.audience]}</Badge>
                    {isConnected && <Badge tone="positive">Connected</Badge>}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-fg-subtle">{i.reads}</p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4">
                <span className="label-mono">Read only</span>

                {!i.available ? (
                  <Button size="sm" variant="ghost" disabled>
                    Coming soon
                  </Button>
                ) : isConnected ? (
                  <Button
                    size="sm"
                    variant="danger"
                    disabled={isPending}
                    onClick={() => handleDisconnect(i.platform)}
                  >
                    {isPending ? 'Disconnecting…' : 'Disconnect'}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={isPending || loading}
                    onClick={() => handleConnect(i.platform)}
                  >
                    {isPending ? 'Redirecting…' : 'Connect'}
                  </Button>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
