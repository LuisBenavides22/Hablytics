import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Field } from '@/components/ui/Field'
import { FormAlert } from '@/components/ui/FormAlert'
import { Panel } from '@/components/ui/Panel'
import { PlatformTile } from '@/components/PlatformLogo'
import { api, ApiError } from '@/lib/api'
import type { Report, WorkspaceConnection } from '@/types'

type ConnectionSummary = Pick<WorkspaceConnection, 'id' | 'platform' | 'createdAt'>

export function Reports() {
  const navigate = useNavigate()

  const [reports, setReports] = useState<Report[]>([])
  const [connections, setConnections] = useState<ConnectionSummary[]>([])
  const [loading, setLoading] = useState(true)

  const [showScanForm, setShowScanForm] = useState(false)
  const [username, setUsername] = useState('')
  const [repo, setRepo] = useState('')
  const [scanError, setScanError] = useState<string | null>(null)
  const [scanning, setScanning] = useState(false)

  useEffect(() => {
    let cancelled = false

    Promise.all([
      api.get<{ report: Report[] }>('/reports'),
      api.get<{ connections: ConnectionSummary[] }>('/integrations'),
    ])
      .then(([reportsRes, connectionsRes]) => {
        if (cancelled) return
        setReports(reportsRes.report)
        setConnections(connectionsRes.connections)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  const githubConnection = connections.find((c) => c.platform === 'GITHUB') ?? null

  async function handleScan(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!githubConnection) return

    setScanError(null)
    setScanning(true)
    try {
      const { report } = await api.post<{ success: boolean; report: Report }>('/workspaces/getReport', {
        platform: 'GITHUB',
        workspaceID: githubConnection.id,
        username: username.trim(),
        repo: repo.trim(),
      })
      navigate(`/app/reports/${report.id}`)
    } catch (err) {
      setScanError(err instanceof ApiError ? err.message : 'Could not generate a report. Please try again.')
      setScanning(false)
    }
  }

  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Every read, in order"
        description="Each scan is kept so you can see whether the gaps are actually closing."
        action={
          <Button onClick={() => setShowScanForm((v) => !v)} disabled={loading}>
            Run a scan
          </Button>
        }
      />

      {showScanForm && (
        <Panel className="mb-6 p-5">
          {!githubConnection ? (
            <EmptyState
              compact
              title="Connect GitHub first"
              description="A scan reads from a source you've connected. GitHub is the only one ready right now."
              action={
                <ButtonLink to="/app/connections" variant="outline" size="sm">
                  Connect a source
                </ButtonLink>
              }
            />
          ) : (
            <form onSubmit={handleScan} className="space-y-4">
              <div className="flex items-center gap-3">
                <PlatformTile platform="GITHUB" size="sm" />
                <p className="text-sm text-fg-subtle">Scan a GitHub repository</p>
              </div>

              {scanError && <FormAlert tone="error">{scanError}</FormAlert>}

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="GitHub username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="octocat"
                  required
                />
                <Field
                  label="Repository"
                  value={repo}
                  onChange={(e) => setRepo(e.target.value)}
                  placeholder="hello-world"
                  required
                />
              </div>

              <Button type="submit" size="sm" disabled={scanning}>
                {scanning ? 'Scanning…' : 'Generate report'}
              </Button>
            </form>
          )}
        </Panel>
      )}

      {!loading && reports.length === 0 ? (
        <EmptyState
          title="No reports yet"
          description="Once a source is connected, run your first scan and it will show up here."
          action={
            <ButtonLink to="/app/connections" variant="outline" size="sm">
              Connect a source
            </ButtonLink>
          }
        />
      ) : (
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line">
          {reports.map((report) => (
            <Link key={report.id} to={`/app/reports/${report.id}`} className="bg-surface">
              <div className="flex items-center gap-4 p-5 transition-colors hover:bg-raised">
                {report.platform && <PlatformTile platform={report.platform} size="sm" />}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-fg-muted">{report.summary}</p>
                  <p className="label-mono mt-1.5">{report.createdAt}</p>
                </div>
                <Badge tone="attention">{report.growthOpportunities.length} gaps</Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
