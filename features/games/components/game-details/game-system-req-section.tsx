'use client'

import { useEffect, useState } from 'react'

interface SystemRequirement {
  minimum?: string
  recommended?: string
}

interface GameData {
  success: boolean
  data: {
    systemRequirements: Record<string, SystemRequirement> | null
    platforms: Array<{
      name: string
      slug: string
      requirements?: SystemRequirement
    }>
  }
  error?: string
}

interface GameSideDetailsProps {
  slug: string
}

const platformDisplayNames: Record<string, string> = {
  pc: 'PC',
  playstation5: 'PlayStation 5',
  playstation4: 'PlayStation 4',
  playstation3: 'PlayStation 3',
  playstation2: 'PlayStation 2',
  playstation1: 'PlayStation',
  'ps-vita': 'PlayStation Vita',
  psp: 'PlayStation Portable',
  'xbox-series-x': 'Xbox Series X/S',
  'xbox-one': 'Xbox One',
  xbox360: 'Xbox 360',
  xbox: 'Xbox',
  'nintendo-switch': 'Nintendo Switch',
  'nintendo-3ds': 'Nintendo 3DS',
  'nintendo-ds': 'Nintendo DS',
  'wii-u': 'Wii U',
  wii: 'Wii',
  gamecube: 'GameCube',
  nintendo64: 'Nintendo 64',
  snes: 'Super Nintendo',
  nes: 'Nintendo Entertainment System',
  ios: 'iOS',
  android: 'Android',
  linux: 'Linux',
  macos: 'macOS',
  'sega-genesis': 'Sega Genesis',
  'sega-dreamcast': 'Sega Dreamcast',
  atari: 'Atari',
  'commodore-64': 'Commodore 64',
  amiga: 'Amiga',
}

export default function GameReqDetails({ slug }: GameSideDetailsProps) {
  const [data, setData] = useState<GameData['data'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [expandedPlatforms, setExpandedPlatforms] = useState<Record<string, boolean>>({})

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await fetch(`/api/games/${slug}`)
        const result = await response.json() as GameData

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

  const togglePlatform = (platform: string) => {
    setExpandedPlatforms(prev => ({
      ...prev,
      [platform]: !prev[platform],
    }))
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!data?.systemRequirements) return null

  return (
    <div className="bg-bg-nav p-6 rounded-xl space-y-4">
      {Object.entries(data.systemRequirements).map(([platform, requirements]) => {
        const hasRequirements = requirements && (requirements.minimum || requirements.recommended)
        const isExpanded = expandedPlatforms[platform]

        return (
          <div key={platform} className="text-text-primary fluid-max-18">
            <div className="flex items-center gap-3">
              <span>System requirements for {platformDisplayNames[platform] || platform}:</span>
              {hasRequirements && (
                <button
                  onClick={() => togglePlatform(platform)}
                  className="px-3 py-1 bg-bg-white text-text-dark hover:bg-bg-accent rounded-full fluid-max-14 font-bold transition-all duration-300 ease-in-out hover:scale-105"
                >
                  {isExpanded ? 'Show less' : 'Show more'}
                </button>
              )}
            </div>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden
              ${isExpanded ? 'opacity-100 max-h-[500px] mt-4' : 'opacity-0 max-h-0 mt-0'}`}
            >
              {requirements?.minimum && (
                <div className="animate-in fade-in duration-300">
                  <div className="fluid-max-18 font-semibold text-text-muted mb-2">Minimum:</div>
                  <div className="text-text-primary fluid-max-16 leading-relaxed">
                    {requirements.minimum}
                  </div>
                </div>
              )}
              {requirements?.recommended && (
                <div className="animate-in fade-in duration-300 mt-4">
                  <div className="fluid-max-18 font-semibold text-text-muted mb-2">Recommended:</div>
                  <div className="text-text-primary fluid-max-16 leading-relaxed">
                    {requirements.recommended}
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}