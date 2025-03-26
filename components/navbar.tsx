import { ModeToggle } from "./mode-toggle"

export function Navbar() {
  return (
    <header className="border-b">
      <div className="container max-w-7xl mx-auto flex items-center justify-between h-14">
        <div className="font-bold">PJKR Futsal</div>
        <ModeToggle />
      </div>
    </header>
  )
}
