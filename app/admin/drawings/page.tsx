export default function AdminDrawingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Group Drawings</h2>
        <button className="rounded-md bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90">
          New Drawing
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Group A */}
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Group A</h3>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Empty slot</span>
              <button className="text-sm text-muted-foreground hover:text-primary">
                Assign Team
              </button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Empty slot</span>
              <button className="text-sm text-muted-foreground hover:text-primary">
                Assign Team
              </button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Empty slot</span>
              <button className="text-sm text-muted-foreground hover:text-primary">
                Assign Team
              </button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Empty slot</span>
              <button className="text-sm text-muted-foreground hover:text-primary">
                Assign Team
              </button>
            </div>
          </div>
        </div>

        {/* Group B */}
        <div className="rounded-lg border p-4">
          <h3 className="text-lg font-semibold">Group B</h3>
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Empty slot</span>
              <button className="text-sm text-muted-foreground hover:text-primary">
                Assign Team
              </button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Empty slot</span>
              <button className="text-sm text-muted-foreground hover:text-primary">
                Assign Team
              </button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Empty slot</span>
              <button className="text-sm text-muted-foreground hover:text-primary">
                Assign Team
              </button>
            </div>
            <div className="flex items-center justify-between rounded-md border p-2">
              <span>Empty slot</span>
              <button className="text-sm text-muted-foreground hover:text-primary">
                Assign Team
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border p-4">
        <h3 className="text-lg font-semibold">Available Teams</h3>
        <p className="mt-2 text-muted-foreground">No teams available for drawing</p>
      </div>
    </div>
  )
}
