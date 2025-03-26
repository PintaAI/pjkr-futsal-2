export function LandingPage() {
  return (
    <main className="flex-1">
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container max-w-7xl mx-auto flex flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            Welcome to PJKR Futsal
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Manage your futsal club, schedule matches, and track player statistics all in one place.
          </p>
        </div>
      </section>
    </main>
  )
}
