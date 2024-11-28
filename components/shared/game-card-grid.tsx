'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import GameCard, { RecommendedGame } from '@/components/shared/game-card'

type GameGridProps = {
  title: string
  games: RecommendedGame[]
  className?: string
}

const GameGrid = ({ title, games, className }: GameGridProps) => {
  return (
    <div className={cn(
      'w-[100%] max-w-[1920px] mx-auto relative',
      className,
    )} style={{ minWidth: '0' }}>
      <h1 className="fluid-max-48 text-text-primary font-semibold pl-[2%]">
        {title}
      </h1>

      <div className="flex flex-wrap gap-[1.5%]" style={{ minWidth: '0' }}>
        {games.map((game) => (
          <div
            key={game.id}
            className={cn(
              'w-[48.25%]',
              'sm:w-[31.83%]',
              'lg:w-[23.875%]',
              'transition-all duration-300',
            )}
            style={{ minWidth: '0' }}
          >
            <GameCard
              {...game}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default GameGrid