import { Metadata } from 'next'
import GameGrid from '@/components/shared/game-card-grid'
import NewAndTrendingSection from '@/features/games/components/new-and-trending-section'
import TopRatedSection from '@/features/games/components/top-rated-section'
import MostAnticipatedSection from '@/features/games/components/most-anticipated-section'


export const metadata: Metadata = {
  title: 'Home - LudoLex',
  description: 'Discover and explore your favorite video games',
}

const cardGridGames = [
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 20,
    hasVideo: true,
  },
]

export default function Home() {
  return (
    <div className="min-w-0">

      {/* Hero Carousel */}
      <NewAndTrendingSection />

      {/* Card Carousels */}
      <TopRatedSection />
      <MostAnticipatedSection />
      {/*<section className="relative w-full min-w-0 max-w-[1920px] mt-[3%]">*/}
      {/*  <h1*/}
      {/*    className="fluid-max-48 text-text-primary font-semibold pl-[2%]">*/}
      {/*    What your Friends are Playing</h1>*/}
      {/*  <CardCarousel*/}
      {/*    games={cardCarouselGames2}*/}
      {/*    options={{*/}
      {/*      align: 'center',*/}
      {/*      slidesToScroll: 5,*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</section>*/}
      {/* Generic Game Cards */}
      <section className="relative w-full min-w-0 max-w-[1920px] mt-[3%]">
        <GameGrid
          title="Recommended Games"
          games={cardGridGames}
        />
      </section>
    </div>
  )
}
