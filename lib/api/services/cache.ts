import { prisma } from '@/lib/db/prisma'
import { Prisma } from '@prisma/client'
import { ExtendedGameData } from '@/features/games/types/api/games'

const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

interface CacheOptions {
  limit?: number
  orderBy?: Prisma.GameOrderByWithRelationInput[]
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
    gameStore: {
      include: {
        store: true
      }
    }
    companies: {
      include: {
        company: true
      }
    }
  }
}>

// Retrieves games from the database that have been cached recently
export async function getCachedGames(options: CacheOptions = {}): Promise<GameWithIncludes[]> {
  const { limit = 10, orderBy = [{ releaseDate: 'desc' }], where = {} } = options

  return prisma.game.findMany({
    where: {
      lastFetched: {
        gte: new Date(Date.now() - CACHE_DURATION),
      },
      AND: {
        mainImage: {
          not: null,
        },
        releaseDate: {
          not: null,
          lte: new Date(),
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
      gameStore: {
        include: {
          store: true,
        },
      },
      companies: {
        include: {
          company: true,
        },
      },
    },
    orderBy,
    take: limit,
  })
}

// Caches games data in the database
export async function cacheGames(
  games: ExtendedGameData [],
  stripHtml: (html: string) => string,
): Promise<(GameWithIncludes | null)[]> {
  return Promise.all(
    games.map(async (game) => {
      try {
        const slug = game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')

        // Disconnect all existing relations
        await prisma.game.update({
          where: { slug },
          data: {
            platforms: { deleteMany: {} },
            genres: { deleteMany: {} },
            gameStore: { deleteMany: {} },
            companies: { deleteMany: {} },
          },
        }).catch((error) => {
          // Only ignore PrismaClientKnownRequestError with code P2025 (Record not found)
          if (
            error.code !== 'P2025' &&
            error.name === 'PrismaClientKnownRequestError'
          ) {
            console.error(`Error deleting relations for game ${game.title}:`, error)
          }
          if (error.name !== 'PrismaClientKnownRequestError') {
            console.error(`Unexpected error while deleting relations for game ${game.title}:`, error)
          }
        })

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

        const storesCreate = {
          create: (game.stores ?? []).map(store => ({
            url: store.url,
            store: {
              connectOrCreate: {
                where: { slug: store.store.slug },
                create: {
                  name: store.store.name,
                  slug: store.store.slug,
                  icon: `/icons/stores/${store.store.slug}.svg`,
                },
              },
            },
          })),
        }

        const companiesCreate = {
          create: (game.companies ?? []).map(company => ({
            role: company.role,
            company: {
              connectOrCreate: {
                where: { slug: company.slug },
                create: {
                  name: company.name,
                  slug: company.slug,
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
          metacritic: game.score ?? null,
          lastFetched: new Date(),
          rawgId: game.rawgId ?? null,
          releaseDate: game.releaseDate ? new Date(game.releaseDate) : null,
          ageRating: game.ageRating ?? null,
          supportedLanguages: game.supportedLanguages ?? [],
          systemRequirements: game.systemRequirements as Prisma.InputJsonValue,
          platforms: platformsCreate,
          genres: genresCreate,
          gameStore: storesCreate,
          companies: companiesCreate,
        }

        return await prisma.game.upsert({
          where: { slug },
          create: createInput,
          update: {
            ...createInput,
            platforms: {
              deleteMany: {},
              create: platformsCreate.create,
            },
            genres: {
              deleteMany: {},
              create: genresCreate.create,
            },
            gameStore: {
              deleteMany: {},
              create: storesCreate.create,
            },
            companies: {
              deleteMany: {},
              create: companiesCreate.create,
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
            gameStore: {
              include: {
                store: true,
              },
            },
            companies: {
              include: {
                company: true,
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