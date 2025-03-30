import { MOCK_ANNOUNCEMENTS } from "@/data/mock-announcements"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Cloud, Calendar, Users, Flag, AlertCircle } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

export function Announcements() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'weather':
        return <Cloud className="w-5 h-5" />
      case 'schedule':
        return <Calendar className="w-5 h-5" />
      case 'meeting':
        return <Users className="w-5 h-5" />
      case 'referee':
        return <Flag className="w-5 h-5" />
      default:
        return <AlertCircle className="w-5 h-5" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-500 bg-red-500/10'
      case 'medium':
        return 'text-yellow-500 bg-yellow-500/10'
      case 'low':
        return 'text-green-500 bg-green-500/10'
      default:
        return 'text-muted-foreground bg-muted'
    }
  }

  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <h2 className="text-2xl font-bold">Tournament Updates</h2>
          </div>
          <Badge variant="outline">
            {MOCK_ANNOUNCEMENTS.length} Announcements
          </Badge>
        </div>

        <div className="grid gap-4">
          {MOCK_ANNOUNCEMENTS.map((announcement) => (
            <Card key={announcement.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Type Icon */}
                  <div className={`rounded-full p-2 ${getPriorityColor(announcement.priority)}`}>
                    {getTypeIcon(announcement.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">{announcement.title}</h3>
                      <span className="text-sm text-muted-foreground">
                        {formatDistanceToNow(new Date(announcement.date), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-muted-foreground">{announcement.content}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
