export default function PublicStandingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Standings</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Group A Standings */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Group A</h3>
          <div className="rounded-lg border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors">
                    <th className="h-12 px-4 text-left align-middle font-medium">Team</th>
                    <th className="h-12 px-4 text-center align-middle font-medium">P</th>
                    <th className="h-12 px-4 text-center align-middle font-medium">W</th>
                    <th className="h-12 px-4 text-center align-middle font-medium">D</th>
                    <th className="h-12 px-4 text-center align-middle font-medium">L</th>
                    <th className="h-12 px-4 text-center align-middle font-medium">GD</th>
                    <th className="h-12 px-4 text-center align-middle font-medium">Pts</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <td colSpan={7} className="p-4 text-center text-muted-foreground">
                      No teams in group
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Group B Standings */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Group B</h3>
          <div className="rounded-lg border">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead className="[&_tr]:border-b">
                  <tr className="border-b transition-colors">
                    <th className="h-12 px-4 text-left align-middle font-medium">Team</th>
                    <th className="h-12 px-4 text-center align-middle font-medium">P</th>
                    <th className="h-12 px-4 text-center align-middle font-medium">W</th>
                    <th className="h-12 px-4 text-center align-middle font-medium">D</th>
                    <th className="h-12 px-4 text-center align-middle font-medium">L</th>
                    <th className="h-12 px-4 text-center align-middle font-medium">GD</th>
                    <th className="h-12 px-4 text-center align-middle font-medium">Pts</th>
                  </tr>
                </thead>
                <tbody className="[&_tr:last-child]:border-0">
                  <tr className="border-b transition-colors hover:bg-muted/50">
                    <td colSpan={7} className="p-4 text-center text-muted-foreground">
                      No teams in group
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Latest Results */}
        <div className="md:col-span-2 space-y-4">
          <h3 className="text-xl font-semibold">Latest Results</h3>
          <div className="rounded-lg border p-4">
            <div className="text-center text-muted-foreground">
              No matches completed yet
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
