'use client'

import { getPlatformIconSlug, PlatformInfo } from '@/features/games/utils/platforms'
import Image from 'next/image'
import React from 'react'

export const PlatformIcons: React.FC<{ platform: PlatformInfo }> = ({ platform }) => {
  const [error, setError] = React.useState(false)
  const iconSlug = getPlatformIconSlug(platform.name)

  return (
    <div className="w-[6%] aspect-square relative">
      <Image
        src={error ? '/platform_icons/unknown.svg' : `/platform_icons/${iconSlug}.svg`}
        alt={platform.name}
        fill
        className="object-contain"
        unoptimized
        onError={() => setError(true)}
      />
    </div>
  )
}