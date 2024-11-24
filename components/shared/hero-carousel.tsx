import React from 'react';
import { ChevronLeft, ChevronRight, PlayCircle } from 'lucide-react';
import { cn } from "@/lib/utils";

interface Game {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  thumbnails?: string[];
  platforms: string[];
  tags: string[];
}

interface GameCarouselProps {
  games: Game[];
  className?: string;
}

const HeroCarousel = ({ games, className }: GameCarouselProps) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % games.length);
  };

  const previousSlide = () => {
    setActiveIndex((current) => (current - 1 + games.length) % games.length);
  };

  const currentGame = games[activeIndex];

  return (
    <div className={cn("w-full relative", className)}>
      <h1 className="text-4xl font-bold text-text-primary mb-6">New and Trending</h1>

      <div className="relative rounded-xl overflow-hidden bg-bg-dark">
        <div className="relative aspect-[21/9] w-full">
          {/* Main Image */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10" />
          <img
            src={currentGame.coverImage}
            alt={currentGame.title}
            className="w-full h-full object-cover"
          />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <PlayCircle className="w-20 h-20 text-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer" />
          </div>

          {/* Game Info */}
          <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
            <div className="flex gap-2 mb-2">
              {currentGame.platforms.map((platform) => (
                <span key={platform} className="text-text-primary text-sm">
                  {platform}
                </span>
              ))}
            </div>

            <h2 className="text-3xl font-bold text-text-primary mb-2">
              {currentGame.title}
            </h2>

            <p className="text-text-secondary text-sm max-w-2xl mb-4">
              {currentGame.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {currentGame.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-accent-primary text-text-secondary text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        {currentGame.thumbnails && (
          <div className="absolute top-4 right-4 flex gap-2 z-30">
            {currentGame.thumbnails.map((thumb, index) => (
              <div
                key={index}
                className="w-32 h-20 rounded-md overflow-hidden border-2 border-custom-border-light"
              >
                <img
                  src={thumb}
                  alt={`${currentGame.title} screenshot ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={previousSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-bg-dark/80 text-text-primary hover:bg-bg-dark transition-colors"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-bg-dark/80 text-text-primary hover:bg-bg-dark transition-colors"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {games.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              activeIndex === index
                ? "bg-text-primary w-4"
                : "bg-text-secondary"
            )}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;