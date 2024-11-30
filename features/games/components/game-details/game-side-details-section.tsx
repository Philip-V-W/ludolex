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
    stores: {
      name: string
      slug: string
      icon: string
      url: string
    }[]
    companies?: CompanyData[]  // Made optional
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
  console.log('developers:', developers, 'publishers:', publishers, 'portDevelopers:', portDevelopers)

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
            Supported Language{publishers.length > 1 ? 's' : ''}
          </h3>
          <div className="text-text-primary text-sm">
            {data.supportedLanguages.join(', ')}
          </div>
        </section>
      )}
    </div>
  )
}