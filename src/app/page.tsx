import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default function Home() {
  // Host kontrolü yap
  const headersList = headers()
  const host = headersList.get('host') || ''
  const dashboardHost = process.env.NEXT_PUBLIC_DASHBOARD_HOST || 'dashboard.softiel.com'
  
  // Eğer dashboard host'uysa, login sayfasına yönlendir
  if (host.toLowerCase().includes(dashboardHost.toLowerCase())) {
    redirect('/login')
  }
  
  // Varsayılan olarak ana siteyi Türkçe'ye yönlendir
  redirect('/tr')
}
