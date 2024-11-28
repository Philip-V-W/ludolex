'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Platform } from '../types'

interface GameRequirementsProps {
  platforms: Platform[]
}

export function GameRequirements({ platforms }: GameRequirementsProps) {
  const [expandedPlatforms, setExpandedPlatforms] = useState<string[]>([])

  const togglePlatform = (platformName: string) => {
    setExpandedPlatforms(prev =>
      prev.includes(platformName)
        ? prev.filter(p => p !== platformName)
        : [...prev, platformName]
    )
  }

  return (
    <div className="bg-bg-nav rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">System Requirements</h2>

      <div className="space-y-6">
        {platforms.map((platform) => (
          <div key={platform.name} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">System requirements for {platform.name}</h3>
              {platform.requirements && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => togglePlatform(platform.name)}
                >
                  {expandedPlatforms.includes(platform.name) ? 'Show less' : 'Show more'}
                </Button>
              )}
            </div>

            {expandedPlatforms.includes(platform.name) && platform.requirements && (
              <div className="space-y-4 text-sm text-text-secondary">
                <div className="space-y-2">
                  <h4 className="font-medium text-text-primary">Minimum:</h4>
                  <div className="whitespace-pre-line pl-4">
                    {platform.requirements.minimum}
                  </div>
                </div>
                {platform.requirements.recommended && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-text-primary">Recommended:</h4>
                    <div className="whitespace-pre-line pl-4">
                      {platform.requirements.recommended}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}