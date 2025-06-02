'use client'

import { useEffect } from 'react'
// import { useAuthStore } from '@/app/stores/authStore'
import { usePathname } from 'next/navigation'
import { useAuthStore } from '@/app/store/useUserStore'


const UserLoader = () => {
  const loadUser = useAuthStore((state) => state.loadUser)
  const user = useAuthStore((state) => state.user)
  const pathname = usePathname()

  useEffect(() => {
    const token = localStorage.getItem('token') || null

    // Load user only if token exists and user not already loaded
    if (token && !user) {
      loadUser()
    }
  }, [pathname])

  return null
}

export default UserLoader
