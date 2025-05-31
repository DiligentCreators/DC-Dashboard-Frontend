'use client'

import useSWR from 'swr'
import Api from '@/lib/api'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { UserType } from '@/app/types/UserType'


// 👇 Type for the hook options
interface UseAuthOptions {
  middleware?: 'auth' | 'guest'
  redirectIfAuthenticated?: string
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: UseAuthOptions = {}) => {
  const router = useRouter()
  const params = useParams()


  const { data: user, error, isLoading
,    mutate } = useSWR<UserType>(
    '/api/user',
    () =>
      Api.get('/api/user')
        .then(res => res.data)
        .catch(error => {
          // if (error.response?.status === 409) {
          //   router.push('/verify-email')
          // } else {
          //   throw error
          // }
          console.log(error)
        }),
  )

  const csrf = () => Api.get('/sanctum/csrf-cookie')

  const register = async ({ setErrors, ...props }: any) => {
    await csrf()
    setErrors([])

    Api.post('/api/register', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response?.status !== 422) throw error
        setErrors(error.response.data.errors)
      })
  }
  const login = async ({ setErrors, setStatus, ...props }: any) => {
    await csrf()
    setErrors([])
    setStatus(null)

    Api.post('/api/login', props)
      .then(() => mutate())
      .catch(error => {
        if (error.response?.status !== 422) throw error
        setErrors(error.response.data.errors)
      })
  }

  const logout = async () => {
    if (!error) {
      await Api.post('/api/logout').then(() => mutate())
    }
    window.location.pathname = '/'
  }

  useEffect(() => {
    if (isLoading) return // Wait until we know the auth state

    // Handle guest middleware (for login/register pages)
    if (middleware === 'guest' && user && redirectIfAuthenticated) {
      router.push(redirectIfAuthenticated)
      return
    }

    // Handle auth middleware (for protected pages)
    if (middleware === 'auth' && !user) {
      router.push('/')
    }
  }, [user, isLoading, middleware, redirectIfAuthenticated])

  return {
    user,
    register,
    login,
    logout,
    isLoading,

  }
}
