import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AdminPage() {
  const adminRoutes = [
    {
      href: "/admin/dashboard",
      label: "Dashboard"
    },
    {
      href: "/admin/drawings",
      label: "Drawings"
    },
    {
      href: "/admin/matches",
      label: "Matches"
    }
  ]

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-10">
      <h1 className="text-4xl font-bold">Admin Panel</h1>
      <div className="flex flex-col space-y-4">
        {adminRoutes.map((route) => (
          <Link 
            key={route.href} 
            href={route.href}
          >
            <Button variant="outline" className="w-[200px]">
              {route.label}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  )
}
