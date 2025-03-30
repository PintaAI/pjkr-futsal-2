import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Users, Clock, AlertCircle } from "lucide-react"
import Link from "next/link"

// In a real app, this would come from an API
const REGISTRATION_STATUS = {
  isOpen: true,
  totalTeams: 8,
  maxTeams: 12,
  deadline: "2025-04-15T23:59:59",
  registrationFee: "$100",
}

export function RegistrationStatus() {
  const teamsRemaining = REGISTRATION_STATUS.maxTeams - REGISTRATION_STATUS.totalTeams
  const isDeadlinePassed = new Date(REGISTRATION_STATUS.deadline) < new Date()
  const isFull = REGISTRATION_STATUS.totalTeams >= REGISTRATION_STATUS.maxTeams

  return (
    <section className="py-12 ">
      <div className="container">
        <Card className="relative overflow-hidden border-2">
          {/* Status Banner */}
          <div className={`absolute top-0 left-0 right-0 py-2 px-4 text-center text-sm font-medium ${
            !REGISTRATION_STATUS.isOpen
              ? "bg-destructive/10 text-destructive"
              : isFull
              ? "bg-yellow-500/10 text-yellow-500"
              : "bg-green-500/10 text-green-500"
          }`}>
            {!REGISTRATION_STATUS.isOpen
              ? "Registration Closed"
              : isFull
              ? "Tournament Full"
              : "Registration Open"}
          </div>

          <CardContent className="pt-12 pb-6">
            <div className="grid gap-6 md:grid-cols-3">
              {/* Teams Status */}
              <div className="flex items-center gap-4">
                <Users className="w-8 h-8 text-primary/80" />
                <div>
                  <p className="text-sm text-muted-foreground">Teams Registered</p>
                  <p className="text-2xl font-bold">
                    {REGISTRATION_STATUS.totalTeams} / {REGISTRATION_STATUS.maxTeams}
                  </p>
                  {!isFull && (
                    <p className="text-sm text-muted-foreground">
                      {teamsRemaining} spot{teamsRemaining !== 1 ? "s" : ""} remaining
                    </p>
                  )}
                </div>
              </div>

              {/* Deadline */}
              <div className="flex items-center gap-4">
                <Clock className="w-8 h-8 text-primary/80" />
                <div>
                  <p className="text-sm text-muted-foreground">Registration Deadline</p>
                  <p className="font-medium">
                    {new Date(REGISTRATION_STATUS.deadline).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isDeadlinePassed ? "Deadline passed" : "Time remaining"}
                  </p>
                </div>
              </div>

              {/* Fee Info */}
              <div className="flex items-center gap-4">
                <AlertCircle className="w-8 h-8 text-primary/80" />
                <div>
                  <p className="text-sm text-muted-foreground">Registration Fee</p>
                  <p className="text-2xl font-bold">{REGISTRATION_STATUS.registrationFee}</p>
                  <p className="text-sm text-muted-foreground">Per team</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
              {REGISTRATION_STATUS.isOpen && !isFull ? (
                <Button asChild size="lg" className="px-8">
                  <Link href="/register">Register Your Team Now</Link>
                </Button>
              ) : (
                <Button asChild size="lg" variant="outline" className="px-8">
                  <Link href="/register">Join Waiting List</Link>
                </Button>
              )}
              <p className="mt-2 text-sm text-muted-foreground">
                {REGISTRATION_STATUS.isOpen && !isFull
                  ? "Secure your spot before registration closes"
                  : "We'll notify you if a spot becomes available"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
