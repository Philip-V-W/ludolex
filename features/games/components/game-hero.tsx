'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Library, Heart } from 'lucide-react'

export function GameHero({ game }) {
  return (
    <div className="relative h-[500px] rounded-lg overflow-hidden">
      <Image
        src={game.backgroundImage}
        alt={game.title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent" />

      <div className="absolute bottom-0 w-full p-6">
        <div className="flex items-end justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold">{game.title}</h1>
            <div className="flex items-center gap-4">
              {/* Your rating component/badges here */}
            </div>
          </div>

          <div className="flex gap-4">
            <Button variant="outline" size="lg">
              <Heart className="mr-2 h-5 w-5" />
              Wishlist
            </Button>
            <Button size="lg">
              <Library className="mr-2 h-5 w-5" />
              Add to Library
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}