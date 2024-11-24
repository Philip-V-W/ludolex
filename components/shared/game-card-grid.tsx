"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import GameCard from '@/components/shared/game-card'

type Game = {
  id: string
  title: string
  image: string
  releaseDate: string
  platforms: string[]
  score?: number
  hasVideo?: boolean
}

type GameGridProps = {
  title: string
  games: Game[]
  className?: string
}

const GameGrid = ({ title, games, className }: GameGridProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <h1 className="pl-4 text-5xl font-semibold text-text-primary">
        {title}
      </h1>

      {/* This is the responsive grid layout */}
      {/*<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">*/}
      <div className="grid grid-cols-4 gap-4">
        {games.map((game) => (
          <GameCard
            key={game.id}
            {...game}
            className="w-full"
          />
        ))}
      </div>
    </div>
  );
};

export default GameGrid