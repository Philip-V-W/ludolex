import { Metadata } from 'next'
import NewAndTrendingSection from '@/features/games/components/new-and-trending-section'
import TopRatedSection from '@/features/games/components/top-rated-section'
import MostAnticipatedSection from '@/features/games/components/most-anticipated-section'
import RecommendedGamesSection from '@/features/games/components/recommended-games-section'


export const metadata: Metadata = {
  title: 'Home - LudoLex',
  description: 'Discover and explore your favorite video games',
}

export default function Home() {
  return (
    <div className="min-w-0">
      {/* Hero Carousel */}
      <NewAndTrendingSection />

      {/* Card Carousels */}
      <TopRatedSection />
      <MostAnticipatedSection />

      {/* Generic Game Cards */}
      <RecommendedGamesSection />
    </div>
  )
}
