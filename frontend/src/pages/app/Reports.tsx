import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/PageHeader'
import { EmptyState } from '@/components/ui/EmptyState'
import { Badge } from '@/components/ui/Badge'
import { Button, ButtonLink } from '@/components/ui/Button'
import { PlatformTile } from '@/components/PlatformLogo'
import type { Report } from '@/types'

const reports: Report[] = []

export function Reports() {
  return (
    <div className="mx-auto max-w-4xl">
      <PageHeader
        title="Every read, in order"
        description="Each scan is kept so you can see whether the gaps are actually closing."
        action={<Button>Run a scan</Button>}
      />

      {reports.length === 0 ? (
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
