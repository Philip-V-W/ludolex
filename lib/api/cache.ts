import { prisma } from '@/lib/db/prisma'
import type { Game } from '@prisma/client'

export async function getCachedGame(
  igdbId: number | null,
  slug: string
): Promise<Game | null> {
  return prisma.game.findFirst({
    where: {
      OR: [{ igdbId: igdbId }, { slug: slug }],
    },
  })
}

export async function cacheGame(gameData: any) {
  const existingGame = await getCachedGame(gameData.igdbId, gameData.slug)

  if (existingGame) {
    if (shouldUpdateCache(existingGame.lastFetched)) {
      return prisma.game.update({
        where: { id: existingGame.id },
        data: {
          ...formatGameData(gameData),
          lastFetched: new Date(),
        },
      })
    }
    return existingGame
  }

  return prisma.game.create({
    data: {
      ...formatGameData(gameData),
      lastFetched: new Date(),
    },
  })
}

function shouldUpdateCache(lastFetched: Date | null): boolean {
  if (!lastFetched) return true

  const cacheExpiry = 24 * 60 * 60 * 1000 // 24 hours
  return Date.now() - lastFetched.getTime() > cacheExpiry
}

function formatGameData(gameData: any) {
  return {
    igdbId: gameData.id || null,
    title: gameData.name,
    slug: gameData.slug,
    description: gameData.description || gameData.summary,
    coverImage: gameData.cover?.url || null,
    backgroundImage: gameData.background_image || null,
    releaseDate: gameData.first_release_date
      ? new Date(gameData.first_release_date * 1000)
      : null,
    metacritic: gameData.metacritic || null,
    ageRating: gameData.age_ratings?.[0]?.rating || null,
    supportedLanguages: gameData.supported_languages || [],
    systemRequirements: gameData.platforms || {},
  }
}
