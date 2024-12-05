'use client'

import { useState, useEffect } from 'react'
import { CompanyRole } from '@prisma/client'

interface CompanyData {
  name: string
  slug: string
  role: CompanyRole
}

interface GameSideData {
  success: boolean
  data: {
    releaseDate: string | null
    ageRating: number | null
    supportedLanguages: string[]
    metacritic: number
    stores: {
      name: string
      slug: string
      icon: string
      url: string
    }[]
    companies?: CompanyData[]
  }
  error?: string
}

interface GameSideDetailsProps {
  slug: string
}

export default function GameSideDetails({ slug }: GameSideDetailsProps) {
  const [data, setData] = useState<GameSideData['data'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`/api/games/${slug}`)
        const result = await response.json() as GameSideData

        if (!result.success) {
          throw new Error(result.error || 'Failed to load game details')
        }

        setData(result.data)
      } catch (err) {
        console.error('Fetch error:', err)
        setError(err instanceof Error ? err.message : 'Failed to load game details')
      } finally {
        setLoading(false)
      }
    }

    fetchGameDetails()
  }, [slug])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data) return null

  // Group companies by role with null check
  const developers = data.companies?.filter(c => c.role === 'DEVELOPER') || []
  const publishers = data.companies?.filter(c => c.role === 'PUBLISHER') || []
  const portDevelopers = data.companies?.filter(c => c.role === 'PORT_DEVELOPER') || []

  return (
    <div className="space-y-6 bg-bg-nav p-6 rounded-xl">

      {/* Companies */}
      {developers.length > 0 && (
        <section>
          <h3 className="fluid-max-18 font-semibold text-text-primary mb-2">
            Developer{developers.length > 1 ? 's' : ''}:
          </h3>
          <div className="text-text-primary text-sm">
            {developers.map(dev => dev.name).join(', ')}
          </div>
        </section>
      )}

      {publishers.length > 0 && (
        <section>
          <h3 className="fluid-max-18 font-semibold text-text-primary mb-2">
            Publisher{publishers.length > 1 ? 's' : ''}:
          </h3>
          <div className="text-text-primary text-sm">
            {publishers.map(pub => pub.name).join(', ')}
          </div>
        </section>
      )}

      {portDevelopers.length > 0 && (
        <section>
          <h3 className="fluid-max-18 font-semibold text-text-primary mb-2">
            Porting Studio{publishers.length > 1 ? 's' : ''}:
          </h3>
          <div className="text-text-primary text-sm">
            {portDevelopers.map(port => port.name).join(', ')}
          </div>
        </section>
      )}

      {/* Release Date */}
      {data.releaseDate && (
        <section>
          <h3 className="fluid-max-18 font-semibold text-text-primary">
            Release date:
          </h3>
          <span className="text-text-primary">
            {new Date(data.releaseDate).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </section>
      )}

      {/* Score Bar */}
      {data.metacritic > 0 && (
        <section>
          <h3 className="fluid-max-18 font-semibold text-text-primary mb-2">
            Score
          </h3>
          <div className="mt-[5%]">
            <div className="flex h-[0.4cqw] w-full overflow-hidden rounded-full gap-1.5">
              {/* Positive segment */}
              <div
                className="h-full bg-rating-success transition-all"
                style={{ width: `${data.metacritic}%` }}
              />
              {/* Negative segment */}
              <div
                className="h-full bg-rating-error transition-all"
                style={{ width: `${Math.max(0, 100 - data.metacritic)}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-sm text-text-primary mt-2">
            <span>{data.metacritic}% Positive</span>
            <span>{Math.max(0, 100 - data.metacritic - 10)}% Negative</span>
          </div>
        </section>
      )}

      {/* Age Rating */}
      {data.ageRating && (
        <section>
          <h3 className="fluid-max-18 font-semibold text-text-primary mb-2">
            Age Rating{publishers.length > 1 ? 's' : ''}
          </h3>
          <div className="text-text-primary">
            {data.ageRating}
          </div>
        </section>
      )}

      {/* Stores */}
      {data.stores.length > 0 && (
        <section>
          <h3 className="fluid-max-18 font-semibold text-text-primary mb-2">
            Available on
          </h3>
          <div className="flex flex-wrap gap-2">
            {data.stores.map((store) => (
              <a
                key={store.slug}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 bg-bg-secondary rounded-lg hover:bg-bg-secondary/80 transition-colors"
              >
                {store.icon && (
                  <img
                    src={store.icon}
                    alt={store.name}
                    className="w-4 h-4"
                  />
                )}
                <span className="text-sm text-text-primary">{store.name}</span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Languages */}
      {data.supportedLanguages && (
        <section>
          <h3 className="fluid-max-18 font-semibold text-text-primary mb-2">
            Supported Language{data.supportedLanguages.length > 1 ? 's' : ''}
          </h3>
          <div className="text-text-primary text-sm">
            {Array.from(new Set(data.supportedLanguages)).join(', ')}
          </div>
        </section>
      )}
    </div>
  )
}