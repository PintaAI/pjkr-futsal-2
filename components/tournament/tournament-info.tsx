import { Card, CardContent } from "@/components/ui/card"
import { 
  Trophy,
  Users,
  Clock,
  CircleDot,
  Goal,
  Brackets
} from "lucide-react"

export function TournamentInfo() {
  return (
    <section className="py-12">
      <div className="container">
        <div className="flex items-center gap-2 mb-8">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h2 className="text-2xl font-bold">Tournament Format</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Users className="w-8 h-8 text-primary/80" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Teams</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 12 participating teams</li>
                    <li>• 5 players per team on field</li>
                    <li>• Maximum 3 substitutes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-primary/80" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Match Rules</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 2 x 10 minute halves</li>
                    <li>• 2 minute half-time break</li>
                    <li>• No extra time in group stage</li>
                    <li>• Penalties in knockout stage</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Brackets className="w-8 h-8 text-primary/80" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Tournament Structure</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 2 groups of 6 teams</li>
                    <li>• Top 4 from each group qualify</li>
                    <li>• Quarter-finals onwards knockout</li>
                    <li>• Third place playoff match</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <CircleDot className="w-8 h-8 text-primary/80" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Points System</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Win: 3 points</li>
                    <li>• Draw: 1 point</li>
                    <li>• Loss: 0 points</li>
                    <li>• Goal difference as tiebreaker</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <Goal className="w-8 h-8 text-primary/80" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">Special Rules</h3>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• No offside rule</li>
                    <li>• Rolling substitutions allowed</li>
                    <li>• 4 foul limit per team</li>
                    <li>• Direct free kicks only</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
