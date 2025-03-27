import { ReactNode } from "react"
import Link from "next/link"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen">
      <div className="border-b">
        <div className="container mx-auto flex gap-4 p-4 text-sm">
          <Link href="/admin/dashboard" className="hover:text-primary">Dashboard</Link>
          <Link href="/admin/matches" className="hover:text-primary">Matches</Link>
          <Link href="/admin/drawings" className="hover:text-primary">Drawings</Link>
        </div>
      </div>
      
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  )
}
