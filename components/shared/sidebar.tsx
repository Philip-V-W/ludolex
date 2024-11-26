'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

interface NavItemProps {
  href: string
  label: string
  isActive?: boolean
  showIcon?: boolean
  size?: 'small' | 'medium' | 'large'
}

const NavItem = ({
                   href,
                   label,
                   isActive,
                   showIcon = true,
                   size = 'small',
                 }: NavItemProps) => {
  const defaultIcon = `/sidebar/${label}/Property 1=Default.svg`
  const hoverIcon = `/sidebar/${label}/Property 1=Variant2.svg`

  const sizeClasses = {
    small: 'fluid-max-16 px-3 tracking-1.24',
    medium: 'fluid-max-20 px-4 font-semibold tracking-1.24',
    large: 'fluid-max-26 px-2 font-bold tracking-1.24',
  }

  const positionClasses = {
    small: 'align-start pl-10',
    medium: 'justify-start pl-6',
    large: 'justify-start',
  }

  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-md py-2 transition-colors ${sizeClasses[size]} ${positionClasses[size]} ${
        isActive
          ? 'bg-accent-primary text-text-primary'
          : 'text-text-primary hover:bg-accent-primary hover:text-text-secondary'
      } break-words min-w-0 w-full`}
    >
      {showIcon && (
        <div className="relative h-[24px] w-[24px] flex-shrink-0">
          <Image
            src={defaultIcon}
            alt={`${label} icon`}
            width={30}
            height={30}
            className={`absolute transition-opacity ${
              isActive ? 'opacity-0' : 'opacity-100 group-hover:opacity-0'
            }`}
          />
          <Image
            src={hoverIcon}
            alt={`${label} icon hover`}
            width={30}
            height={30}
            className={`absolute transition-opacity ${
              isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
            }`}
          />
        </div>
      )}
      <span className="truncate">{label}</span>
    </Link>
  )
}

const NavSection = ({
                      title,
                      children,
                    }: {
  title?: string
  children: React.ReactNode
}) => (
  <div className="space-y-1">
    {title && (
      <h2 className="mb-2 px-3 fluid-max-16 font-semibold uppercase text-text-muted">
        {title}
      </h2>
    )}
    {children}
  </div>
)

const NavContent = () => {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {/* Main Navigation */}
      <NavSection>
        <NavItem
          href="/"
          label="Home"
          isActive={pathname === '/'}
          size="large"
          showIcon={false}
        />
      </NavSection>

      {/* User Collections */}
      <NavSection>
        <NavItem
          href="/username"
          label="Username"
          isActive={pathname === '/username'}
          size="large"
          showIcon={false}
        />
        <NavItem
          href="/library"
          label="My Library"
          isActive={pathname === '/library'}
        />
        <NavItem
          href="/wishlist"
          label="Wishlist"
          isActive={pathname === '/wishlist'}
        />
        <NavItem
          href="/reviews"
          label="My Reviews"
          isActive={pathname === '/reviews'}
        />
        <NavItem
          href="/friends"
          label="Friends List"
          isActive={pathname === '/friends'}
        />
        <NavItem
          href="/settings"
          label="Settings"
          isActive={pathname === '/settings'}
        />
      </NavSection>

      {/* Search Section */}
      <NavSection>
        <NavItem
          href="/search"
          label="Search"
          isActive={pathname === '/search'}
          size="large"
          showIcon={false}
        />
        <NavItem
          href="/by-release"
          label="By Release"
          isActive={pathname === '/by-release'}
          size="medium"
          showIcon={false}
        />
        <NavItem
          href="/last-30-days"
          label="Last 30 days"
          isActive={pathname === '/last-30-days'}
        />
        <NavItem
          href="/last-7-days"
          label="Last 7 days"
          isActive={pathname === '/last-7-days'}
        />
        <NavItem
          href="/calendar"
          label="Calendar"
          isActive={pathname === '/calendar'}
        />
        <NavItem
          href="/by-review"
          label="By Review"
          isActive={pathname === '/by-review'}
          size="medium"
          showIcon={false}
        />
        <NavItem
          href="/popular"
          label="Popular"
          isActive={pathname === '/popular'}
        />
        <NavItem
          href="/recent"
          label="Recent"
          isActive={pathname === '/recent'}
        />
        <NavItem
          href="/friends"
          label="Friends"
          isActive={pathname === '/friends'}
        />
        <NavItem
          href="/by-rating"
          label="By Rating"
          isActive={pathname === '/by-rating'}
          size="medium"
          showIcon={false}
        />
        <NavItem
          href="/best-of-2024"
          label="Best of 2024"
          isActive={pathname === '/best-2024'}
        />
        <NavItem
          href="/highest-rated"
          label="Highest Rated"
          isActive={pathname === '/highest-rated'}
        />
        <NavItem
          href="/lowest-rated"
          label="Lowest Rated"
          isActive={pathname === '/lowest-rated'}
        />
      </NavSection>

      {/* Upcoming */}
      <NavSection>
        <NavItem
          href="/upcoming"
          label="Upcoming"
          isActive={pathname === '/upcoming'}
          size="large"
          showIcon={false}
        />
        <NavItem
          href="/game-trailers"
          label="Game Trailers"
          isActive={pathname === '/trailers'}
        />
        <NavItem
          href="/developer-interviews"
          label="Developer Interviews"
          isActive={pathname === '/interviews'}
        />
        <NavItem
          href="/announcements"
          label="Announcements"
          isActive={pathname === '/announcements'}
        />
        <NavItem
          href="/previews"
          label="Previews"
          isActive={pathname === '/previews'}
        />
        <NavItem
          href="/release-dates"
          label="Release Dates"
          isActive={pathname === '/release-dates'}
        />
        <NavItem
          href="/news-and-updates"
          label="News & Updates"
          isActive={pathname === '/news'}
        />
      </NavSection>

      {/* All Games */}
      <NavSection>
        <NavItem
          href="/all-games"
          label="All Games"
          isActive={pathname === '/all-games'}
          size="large"
          showIcon={false}
        />
      </NavSection>

      {/* Browse */}
      <NavSection>
        <NavItem
          href="/browse"
          label="Browse"
          isActive={pathname === '/browse'}
          size="large"
          showIcon={false}
        />
        <NavItem
          href="/by-store"
          label="By Store"
          isActive={pathname === '/by-store'}
        />
        <NavItem
          href="/by-platform"
          label="By Platform"
          isActive={pathname === '/by-platform'}
        />
        <NavItem
          href="/by-tag"
          label="By Tag"
          isActive={pathname === '/by-tag'}
        />
        <NavItem
          href="/by-genre"
          label="By Genre"
          isActive={pathname === '/by-genre'}
        />
        <NavItem
          href="/by-creator"
          label="By Creator"
          isActive={pathname === '/by-creator'}
        />
        <NavItem
          href="/by-developer"
          label="By Developer"
          isActive={pathname === '/by-developer'}
        />
        <NavItem
          href="/by-publisher"
          label="By Publisher"
          isActive={pathname === '/by-publisher'}
        />
      </NavSection>

      {/* Hot Deals & Recommendations */}
      <NavSection>
        <NavItem
          href="/hot-deals"
          label="Hot Deals"
          isActive={pathname === '/hot-deals'}
          size="large"
          showIcon={false}
        />
        <NavItem
          href="/recommendations"
          label="Recommendations"
          isActive={pathname === '/recommendations'}
          size="large"
          showIcon={false}
        />
      </NavSection>

      {/* Community */}
      <NavSection>
        <NavItem
          href="/community"
          label="Community"
          isActive={pathname === '/community'}
          size="large"
          showIcon={false}
        />
        <NavItem
          href="/screenshots"
          label="Screenshots"
          isActive={pathname === '/screenshots'}
        />
        <NavItem
          href="/fan-art"
          label="Fan art"
          isActive={pathname === '/artwork'}
        />
        <NavItem
          href="/videos"
          label="Videos"
          isActive={pathname === '/videos'}
        />
        <NavItem
          href="/live-streams"
          label="Live Streams"
          isActive={pathname === '/streams'}
        />
        <NavItem
          href="/clips"
          label="Clips"
          isActive={pathname === '/clips'}
        />
        <NavItem
          href="/guides"
          label="Guides"
          isActive={pathname === '/guides'}
        />
        <NavItem
          href="/reviews-community"
          label="Reviews"
          isActive={pathname === '/reviews-community'}
        />
      </NavSection>

      {/* Support & Settings & Events*/}
      <NavSection>
        <NavItem
          href="/events"
          label="Events"
          isActive={pathname === '/events'}
          size="large"
          showIcon={false}
        />
        <NavItem
          href="/support"
          label="Support"
          isActive={pathname === '/support'}
          size="large"
          showIcon={false}
        />
        <NavItem
          href="/accessibility"
          label="Accessibility"
          isActive={pathname === '/accessibility'}
          size="large"
          showIcon={false}
        />
      </NavSection>
    </nav>
  )
}

export default function Sidebar() {
  return (
    <>
      {/* Mobile Menu Button - Only visible on small screens */}
      <div className="fixed left-4 top-20 z-40 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="rounded-md bg-accent-primary p-2 text-text-primary hover:bg-accent-secondary">
              <div className="h-6 w-6">
                <Image
                  src="/sidebar/burger-menu.svg"
                  alt="Menu"
                  width={24}
                  height={24}
                />
              </div>
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="w-auto min-w-[16rem] max-w-[20rem] bg-bg-nav p-6">
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar - Hidden on small screens */}
      <div className="hidden lg:block lg:w-auto lg:min-w-[16rem] lg:max-w-[20rem]">
        <div className="sticky top-16 border border-bg-nav bg-bg-nav px-4 py-6 rounded-xl">
          <NavContent />
        </div>
      </div>
    </>
  )
}