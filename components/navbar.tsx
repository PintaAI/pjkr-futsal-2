import Link from "next/link"
import { ModeToggle } from "./mode-toggle"
import { HTMLAttributes } from "react"

export function Navbar({ ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <header className="border-b" {...props}>
      <div className="container max-w-7xl mx-auto flex items-center justify-between h-14">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-bold hover:text-primary">
            PJKR Futsal
          </Link>
          <nav className="flex gap-4 text-sm">
            <Link href="/public/schedule" className="hover:text-primary">Schedule</Link>
            <Link href="/public/standings" className="hover:text-primary">Standings</Link>
            <Link href="/public/live" className="hover:text-primary">Live</Link>
            <Link href="/public/bracket" className="hover:text-primary">Bracket</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/dashboard" 
            className="text-sm rounded-md bg-primary px-3 py-1.5 text-primary-foreground hover:bg-primary/90"
          >
            Admin
          </Link>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
