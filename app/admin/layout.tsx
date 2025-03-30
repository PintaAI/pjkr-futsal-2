import { ReactNode } from "react"
import Link from "next/link"

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen">   
      <main className="container mx-auto">
        {children}
      </main>
    </div>
  )
}
