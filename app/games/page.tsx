'use client'


import EmblaCarousel from '@/components/shared/hero-carousel'

const games = [
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


export default function CarouselDemo() {
  return (
    <EmblaCarousel
      games={games}
      options={{
        align: 'start',
        loop: true,
      }}
    />
  )
}