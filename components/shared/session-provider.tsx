'use client'

import { useSession } from 'next-auth/react'

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return children
}
