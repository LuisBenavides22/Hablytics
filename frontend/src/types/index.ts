export type Plan = 'FREE' | 'PRO' | 'ELITE'

export type Platform =
  | 'GITHUB'
  | 'SLACK'
  | 'NOTION'
  | 'MICROSOFT'
  | 'GOOGLE_DRIVE'
  | 'CANVAS'
  | 'ZOOM'
  | 'GMAIL'

export type GrowthCategory = 'Technical' | 'Strategic' | 'Soft Skill'

export interface User {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  role: string | null
  plan: Plan
  createdAt: string
  updatedAt: string
}

export interface GrowthOpportunity {
  category: GrowthCategory
  observation: string
  action_item: string
}

export interface Report {
  id: string
  userId: string
  platform: Platform | null
  summary: string
  hiddenWins: string[]
  growthOpportunities: GrowthOpportunity[]
  networkingTargets: string[]
  createdAt: string
}

export interface WorkspaceConnection {
  id: string
  userId: string
  platform: Platform
  expiresAt: string | null
  createdAt: string
  updatedAt: string
}

export interface AuditLog {
  id: string
  userId: string | null
  action: string
  resourceType: string | null
  resourceId: string | null
  metadata: Record<string, unknown> | null
  createdAt: string
}

export interface PlanTask {
  id: string
  week: 1 | 2 | 3 | 4
  title: string
  detail: string
  category: GrowthCategory
  done: boolean
}
