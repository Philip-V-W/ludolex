import { prisma } from '@/lib/db/prisma'
import type { TransformedGame } from '@/features/games/types'

const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

interface CacheOptions {
  limit?: number
  orderBy?: { [key: string]: 'asc' | 'desc' }
  where?: any
}

export async function getCachedGames(options: CacheOptions = {}) {
  const { limit = 10, orderBy = { releaseDate: 'desc' }, where = {} } = options

  return prisma.game.findMany({
    where: {
      lastFetched: {
        gte: new Date(Date.now() - CACHE_DURATION),
      },
      AND: {
        mainImage: {
          not: null,
        },
        ...where,
      },
    },
    include: {
      platforms: {
        include: {
          platform: true,
        },
      },
      genres: {
        include: {
          genre: true,
        },
      },
    },
    orderBy,
    take: limit,
  })
}

export async function cacheGames(
  games: TransformedGame[],
  stripHtml: (html: string) => string,
) {
  return Promise.all(
    games.map(async (game) => {
      try {
        return await prisma.game.upsert({
          where: {
            slug: game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          },
          update: {
            title: game.title,
            description: stripHtml(game.description),
            mainImage: game.mainImage,
            screenshots: game.thumbnails || [],
            metacritic: game.score,
            lastFetched: new Date(),
            platforms: {
              deleteMany: {},
              create: (game.platforms || []).map(p => ({
                platform: {
                  connectOrCreate: {
                    where: { name: p.name },
                    create: {
                      name: p.name,
                      slug: p.slug,
                    },
                  },
                },
              })),
            },
            genres: {
              deleteMany: {},
              create: (game.genres || []).map(genre => ({
                genre: {
                  connectOrCreate: {
                    where: { name: genre },
                    create: {
                      name: genre,
                      slug: genre.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    },
                  },
                },
              })),
            },
          },
          create: {
            title: game.title,
            slug: game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
            description: stripHtml(game.description),
            mainImage: game.mainImage,
            screenshots: game.thumbnails || [],
            metacritic: game.score,
            lastFetched: new Date(),
            platforms: {
              create: (game.platforms || []).map(p => ({
                platform: {
                  connectOrCreate: {
                    where: { name: p.name },
                    create: {
                      name: p.name,
                      slug: p.slug,
                    },
                  },
                },
              })),
            },
            genres: {
              create: (game.genres || []).map(genre => ({
                genre: {
                  connectOrCreate: {
                    where: { name: genre },
                    create: {
                      name: genre,
                      slug: genre.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    },
                  },
                },
              })),
            },
          },
          include: {
            platforms: {
              include: {
                platform: true,
              },
            },
            genres: {
              include: {
                genre: true,
              },
            },
          },
        })
      } catch (error) {
        console.error(`Error caching game ${game.title}:`, error)
        return null
      }
    }),
  )
}