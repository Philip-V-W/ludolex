import { prisma } from '@/lib/db/prisma'
import { NextResponse } from 'next/server'
import { TransformedGame } from '@/features/games/types'
import { getTrendingGames } from '@/lib/api/games'

const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours
const GAMES_LIMIT = 10

function stripHtml(html: string) {
  return html?.replace(/<[^>]*>/g, '\n').replace(/\n{2,}/g, '\n').trim() || ''
}

export async function GET() {
  try {
    // Check cache first
    const cachedGames = await prisma.game.findMany({
      where: {
        lastFetched: {
          gte: new Date(Date.now() - CACHE_DURATION),
        },
        AND: {
          mainImage: {
            not: null
          },
          screenshots: {
            isEmpty: false
          }
        }
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
      orderBy: {
        releaseDate: 'desc',
      },
      take: GAMES_LIMIT,
    })

    // Return cached games if available
    if (cachedGames.length === GAMES_LIMIT) {
      const transformedCachedGames: TransformedGame[] = cachedGames.map(game => ({
        id: String(game.id),
        title: game.title,
        description: stripHtml(game.description || ''),
        mainImage: game.mainImage || '/placeholder.jpg',
        thumbnails: game.screenshots.length > 0
          ? game.screenshots
          : Array(4).fill(game.mainImage || '/placeholder.jpg'),
        platforms: game.platforms.map(p => ({
          name: p.platform.name,
          slug: p.platform.slug,
        })),
        genres: game.genres.map(g => g.genre.name),
        score: game.metacritic || 0,
      }))
      return NextResponse.json({ success: true, data: transformedCachedGames })
    }

    // Fetch fresh games if cache miss
    const games = await getTrendingGames()

    // Process and cache the games
    const transformedGames = await Promise.all(
      games.map(async game => {
        try {
          // Cache the game data
          const cachedGame = await prisma.game.upsert({
            where: { slug: game.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') },
            update: {
              title: game.title,
              description: stripHtml(game.description),
              mainImage: game.mainImage,
              screenshots: game.thumbnails, // Store thumbnails in screenshots array
              metacritic: game.score,
              lastFetched: new Date(),
              platforms: {
                deleteMany: {},
                create: game.platforms.map(p => ({
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
                create: game.genres.map(genre => ({
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
              screenshots: game.thumbnails,
              metacritic: game.score,
              lastFetched: new Date(),
              platforms: {
                create: game.platforms.map(p => ({
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
                create: game.genres.map(genre => ({
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

          return {
            id: String(cachedGame.id),
            title: cachedGame.title,
            description: stripHtml(cachedGame.description || ''),
            mainImage: cachedGame.mainImage || '/placeholder.jpg',
            thumbnails: cachedGame.screenshots || [cachedGame.mainImage || '/placeholder.jpg'],
            platforms: cachedGame.platforms.map(p => ({
              name: p.platform.name,
              slug: p.platform.slug,
            })),
            genres: cachedGame.genres.map(g => g.genre.name),
            score: cachedGame.metacritic || 0,
          }
        } catch (error) {
          console.error(`Error processing game ${game.title}:`, error)
          return null
        }
      }),
    )

    // Filter out any failed transformations
    const validGames = transformedGames.filter(Boolean) as TransformedGame[]
    return NextResponse.json({ success: true, data: validGames })

  } catch (error) {
    console.error('Error fetching trending games:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch games' },
      { status: 500 },
    )
  }
}