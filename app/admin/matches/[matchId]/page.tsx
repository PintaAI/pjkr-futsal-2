"use client";

import { MatchTracking } from "@/components/match/match-tracking"
import Link from "next/link";
import { use } from "react";

interface MatchPageProps {
  params: Promise<{
    matchId: string
  }>
}

export default function AdminMatchPage({ params }: MatchPageProps) {
  const { matchId } = use(params);
  return (
    <div className="container mx-auto py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Match Tracking</h1>
        <Link href="/admin/matches" className="text-muted-foreground hover:text-foreground">
          ← Back to matches
        </Link>
      </div>
      
      <MatchTracking matchId={matchId} />
    </div>
  )
}
