export default function PublicSchedulePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Match Schedule</h2>

      {/* Filter and search section */}
      <div className="flex items-center gap-4">
        <select className="rounded-md border px-3 py-2">
          <option value="all">All Groups</option>
          <option value="a">Group A</option>
          <option value="b">Group B</option>
        </select>
        <select className="rounded-md border px-3 py-2">
          <option value="all">All Dates</option>
          <option value="today">Today</option>
          <option value="tomorrow">Tomorrow</option>
          <option value="week">This Week</option>
        </select>
      </div>

      {/* Schedule grid */}
      <div className="grid gap-4">
        <div className="rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Today</div>
          <div className="mt-3 grid gap-4">
            {/* Example match card */}
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <div className="font-semibold">Group A</div>
                  <div className="text-sm text-muted-foreground">15:00</div>
                </div>
                <div className="text-center flex-1">
                  <div className="flex items-center justify-center gap-3">
                    <span className="font-semibold">Team A</span>
                    <span className="text-muted-foreground">vs</span>
                    <span className="font-semibold">Team B</span>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Main Court
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-muted px-2 py-1 text-xs">
                    Upcoming
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="text-sm text-muted-foreground">Tomorrow</div>
          <div className="mt-2 text-center text-sm text-muted-foreground">
            No matches scheduled
          </div>
        </div>
      </div>
    </div>
  )
}
