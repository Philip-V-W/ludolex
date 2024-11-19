import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home - LudoLex',
  description: 'Discover and explore your favorite video games',
}

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h1 className="text-4xl font-bold text-text-primary">
          Welcome to LudoLex
        </h1>
        <p className="text-text-secondary">
          Your comprehensive source for video game information
        </p>
      </section>

      {/* Featured Games Section - Placeholder */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Featured Games
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* TODO */}
        </div>
      </section>

      {/* Recent Reviews Section - Placeholder */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-text-primary">
          Recent Reviews
        </h2>
        <div className="grid gap-6">
            {/* TODO */}
        </div>
      </section>
    </div>
  )
}
