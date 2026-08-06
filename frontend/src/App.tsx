import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MarketingLayout } from '@/components/layout/MarketingLayout'
import { AppShell } from '@/components/layout/AppShell'
import { Landing } from '@/pages/Landing'
import { Login } from '@/pages/Login'
import { Signup } from '@/pages/Signup'
import { ForgotPassword } from '@/pages/ForgotPassword'
import { ResetPassword } from '@/pages/ResetPassword'
import { NotFound } from '@/pages/NotFound'
import { Dashboard } from '@/pages/app/Dashboard'
import { Connections } from '@/pages/app/Connections'
import { Reports } from '@/pages/app/Reports'
import { ReportDetail } from '@/pages/app/ReportDetail'
import { Plan } from '@/pages/app/Plan'
import { Benchmarks } from '@/pages/app/Benchmarks'
import { Settings } from '@/pages/app/Settings'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/app" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="connections" element={<Connections />} />
          <Route path="reports" element={<Reports />} />
          <Route path="reports/:id" element={<ReportDetail />} />
          <Route path="plan" element={<Plan />} />
          <Route path="benchmarks" element={<Benchmarks />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
