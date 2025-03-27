export default function PublicLivePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Live Matches</h2>

      {/* Active Matches */}
      <div className="grid gap-4">
        {/* Example Live Match Card */}
        <div className="rounded-lg border p-6">
          <div className="text-center">
            <div className="text-sm font-medium text-muted-foreground">Group A</div>
            <div className="mt-2 text-2xl font-bold">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div>Team A</div>
                  <div className="text-4xl font-bold text-primary mt-2">0</div>
                </div>
                <div className="text-muted-foreground">vs</div>
                <div className="text-center">
                  <div>Team B</div>
                  <div className="text-4xl font-bold text-primary mt-2">0</div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                First Half • 12:34
              </span>
            </div>
          </div>

          {/* Match Stats */}
          <div className="mt-8 grid gap-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <div className="text-right">0</div>
              <div className="text-center text-sm text-muted-foreground">Shots</div>
              <div>0</div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <div className="text-right">0</div>
              <div className="text-center text-sm text-muted-foreground">Fouls</div>
              <div>0</div>
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <div className="text-right">0</div>
              <div className="text-center text-sm text-muted-foreground">Yellow Cards</div>
              <div>0</div>
            </div>
          </div>

          {/* Recent Events */}
          <div className="mt-8">
            <h3 className="font-semibold">Match Events</h3>
            <div className="mt-2">
              <p className="text-sm text-muted-foreground">No events yet</p>
            </div>
          </div>
        </div>

        {/* No Active Matches State */}
        <div className="rounded-lg border p-8 text-center">
          <h3 className="text-lg font-semibold">No Live Matches</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Check the schedule for upcoming matches
          </p>
          <div className="mt-4">
            <a
              href="/public/schedule"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              View Schedule
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
