import { Metadata } from 'next'
import EmblaCarousel from '@/components/shared/hero-carousel'
import CardCarousel from '@/components/shared/card-carousel'
import GameGrid from '@/components/shared/game-card-grid'
// import EmblaCarousel from '@/components/shared/EmblaCarousel'


export const metadata: Metadata = {
  title: 'Home - LudoLex',
  description: 'Discover and explore your favorite video games',
}

const heroCarouselGames = [
  {
    id: '1',
    title: 'Senua\'s Saga: Hellblade II',
    description: 'The sequel to the acclaimed Hellblade: Senua\'s Sacrifice, following the continuing journey of Senua through a dark and mythological world.',
    mainImage: '/hollow_knight.jpg',
    thumbnails: [
      '/thumbnail1.jpg',
      '/thumbnail2.jpg',
      '/thumbnail3.jpg',
      '/thumbnail4.jpg',
    ],
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
    genres: ['Singleplayer', 'Story Rich', 'Great Soundtrack', 'Action'],
    score: 80,
  },
  {
    id: '2',
    title: 'Senua\'s Saga: Hellblade II',
    description: 'The sequel to the acclaimed Hellblade: Senua\'s Sacrifice, following the continuing journey of Senua through a dark and mythological world.',
    mainImage: '/hollow_knight.jpg',
    thumbnails: [
      '/thumbnail1.jpg',
      '/thumbnail2.jpg',
      '/thumbnail3.jpg',
      '/thumbnail4.jpg',
    ],
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
    genres: ['Singleplayer', 'Story Rich', 'Great Soundtrack', 'Action'],
    score: 80,
  },
  {
    id: '3',
    title: 'Senua\'s Saga: Hellblade II',
    description: 'The sequel to the acclaimed Hellblade: Senua\'s Sacrifice, following the continuing journey of Senua through a dark and mythological world.',
    mainImage: '/hollow_knight.jpg',
    thumbnails: [
      '/thumbnail1.jpg',
      '/thumbnail2.jpg',
      '/thumbnail3.jpg',
      '/thumbnail4.jpg',
    ],
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
    genres: ['Singleplayer', 'Story Rich', 'Great Soundtrack', 'Action'],
    score: 80,
  },
  {
    id: '4',
    title: 'Senua\'s Saga: Hellblade II',
    description: 'The sequel to the acclaimed Hellblade: Senua\'s Sacrifice, following the continuing journey of Senua through a dark and mythological world.',
    mainImage: '/hollow_knight.jpg',
    thumbnails: [
      '/thumbnail1.jpg',
      '/thumbnail2.jpg',
      '/thumbnail3.jpg',
      '/thumbnail4.jpg',
    ],
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
    genres: ['Singleplayer', 'Story Rich', 'Great Soundtrack', 'Action'],
    score: 80,
  },
]

const cardCarouselGames = [
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/card_carousel.jpg',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/card_carousel.jpg',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/card_carousel.jpg',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/card_carousel.jpg',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/card_carousel.jpg',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/card_carousel.jpg',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/card_carousel.jpg',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
]

const cardCarouselGames2 = [
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/pathofexile2.webp',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/card_carousel.jpg',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/card_carousel.jpg',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/pathofexile2.webp',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/card_carousel.jpg',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/card_carousel.jpg',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/card_carousel.jpg',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/pathofexile2.webp',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/pathofexile2.webp',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/pathofexile2.webp',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/pathofexile2.webp',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/pathofexile2.webp',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/pathofexile2.webp',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
  {
    id: '1',
    title: 'Black Myth: Wu Kong',
    image: '/pathofexile2.webp',
    score: 92,
    platforms: ['/ri_android-fill.svg', '/ri_apple-fill.svg', '/ri_windows-fill.svg'],
  },
]

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
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 40,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 60,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 80,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },

  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },
  {
    id: '1',
    title: 'Elden Ring',
    image: '/elden-ring.jpg',
    releaseDate: '05/08/2019',
    platforms: ['/ri_android-fill', '/ri_apple-fill', '/ri_windows-fill'],
    score: 95,
    hasVideo: true,
  },




]

export default function Home() {
  return (
    <div className="min-w-0">
      <section className="relative w-full min-w-0 max-w-[1920px] mt-[-1%]">
        <h1
          className="fluid-max-48 text-text-primary font-semibold line-clamp-2">
          New and Trending
        </h1>
        <EmblaCarousel
          games={heroCarouselGames}
          options={{
            align: 'start',
            loop: true,
          }}
        />
      </section>
      {/* Card Carousels */}
      <section className="relative w-full min-w-0 max-w-[1920px]">
        <h1
          className="fluid-max-48 text-text-primary font-semibold line-clamp-2">
          Top Rated
        </h1>
        <CardCarousel
          games={cardCarouselGames}
          options={{
            align: 'start',
            slidesToScroll: 5,
          }}
        />
      </section>
      <section className="relative w-full min-w-0 max-w-[1920px]">
        <h1
          className="fluid-max-48 text-text-primary font-semibold line-clamp-2">
          Most Anticipated</h1>
        {/*<h2 className="text-4xl font-bold text-text-primary mb-6">Top Rated</h2>*/}
        <CardCarousel
          games={cardCarouselGames2}
          options={{
            align: 'start',
            slidesToScroll: 5,
          }}
        />
      </section>
      <section className="relative w-full min-w-0 max-w-[1920px]">
        <h1
          className="fluid-max-48 text-text-primary font-semibold line-clamp-2">
          What your Friends are Playing</h1>
        {/*<h2 className="text-4xl font-bold text-text-primary mb-6">Top Rated</h2>*/}
        <CardCarousel
          games={cardCarouselGames2}
          options={{
            align: 'start',
            slidesToScroll: 5,
          }}
        />
      </section>
      {/* Generic Cards */}
      <section className="relative w-full min-w-0 max-w-[1920px]">
        {/*<h1 className="pl-4 text-5xl font-semibold text-text-primary">Recommended Games</h1>*/}
        {/*<h2 className="text-4xl font-bold text-text-primary mb-6">Top Rated</h2>*/}
        <GameGrid
          title="Recommended Games"
          games={cardGridGames}
          className="mb-8"
        />
      </section>
    </div>
  )
}
