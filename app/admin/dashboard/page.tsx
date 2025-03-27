export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Total Matches</h3>
          <p className="text-2xl">0</p>
        </div>
        
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Active Matches</h3>
          <p className="text-2xl">0</p>
        </div>
        
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Teams</h3>
          <p className="text-2xl">0</p>
        </div>
        
        <div className="rounded-lg border p-4">
          <h3 className="font-semibold">Total Players</h3>
          <p className="text-2xl">0</p>
        </div>
      </div>
    </div>
  )
}
