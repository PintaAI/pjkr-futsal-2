import { ReactNode } from "react"

interface PublicLayoutProps {
  children: ReactNode
}

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <main className="container mx-auto p-4">
      {children}
    </main>
  )
}
