import { prisma } from '@/lib/db/prisma'
import { Prisma } from '@prisma/client'
import { ExtendedTransformedGame } from '@/features/games/types/api/games'

const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

interface CacheOptions {
  limit?: number
  orderBy?: Prisma.GameOrderByWithRelationInput
  where?: Prisma.GameWhereInput
}

export type GameWithIncludes = Prisma.GameGetPayload<{
  include: {
    platforms: {
      include: {
        platform: true
      }
    }
    genres: {
      include: {
        genre: true
      }
    }
  }
}>

// Retrieves games from the database that have been cached recently
export async function getCachedGames(options: CacheOptions = {}): Promise<GameWithIncludes[]> {
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

// Caches games data in the database
export async function cacheGames(
  games: ExtendedTransformedGame[],
  stripHtml: (html: string) => string,
): Promise<(GameWithIncludes | null)[]> {
  return Promise.all(
    games.map(async (game) => {
      try {
        const slug = game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

        const platformsCreate = {
          create: (game.platforms ?? []).map(p => ({
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
        }

        const genresCreate = {
          create: (game.genres ?? []).map(genre => ({
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
        }

        const createInput: Prisma.GameCreateInput = {
          title: game.title,
          slug,
          description: stripHtml(game.description),
          mainImage: game.mainImage,
          screenshots: game.thumbnails ?? [],
          metacritic: game.score ?? undefined,
          lastFetched: new Date(),
          rawgId: game.rawgId ?? null,
          releaseDate: game.releaseDate ? new Date(game.releaseDate) : null,
          ageRating: game.ageRating ?? null,
          supportedLanguages: game.supportedLanguages ?? [],
          systemRequirements: game.systemRequirements as Prisma.InputJsonValue,
          platforms: platformsCreate,
          genres: genresCreate,
        }

        return await prisma.game.upsert({
          where: { slug },
          create: createInput,
          update: {
            ...createInput,
            platforms: {
              deleteMany: {},
              ...platformsCreate,
            },
            genres: {
              deleteMany: {},
              ...genresCreate,
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