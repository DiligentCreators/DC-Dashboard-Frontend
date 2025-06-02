import { create } from 'zustand'
import { registerUser, loginUser, fetchUser, logoutUser } from '@/app/services/authService'
import { RegisterPayload, LoginPayload } from '@/app/services/authService'
import { UserType } from '@/app/types/UserType'
import { useCommonStore } from './commonStore'
import Cookies from 'js-cookie'

type AuthStore = {
  user: UserType | null
  loading: boolean
  error: string | null
  register: (form: RegisterPayload) => Promise<void>
  login: (form: LoginPayload) => Promise<void>
  logout: () => Promise<void>
  loadUser: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  register: async (form) => {
    const { setValidationErrors, clearValidationErrors } = useCommonStore.getState()
    try {
      set({ loading: true, error: null })
      clearValidationErrors()

       await registerUser(form)

    } catch (err: any) {
      const validation = err?.response?.data?.errors
      if (validation) {
        const flatErrors = Object.values(validation).flat().filter(e => typeof e === 'string') as string[]
        setValidationErrors(flatErrors)
      } else {
        set({ error: err?.response?.data?.message || 'Registration failed' })
      }
    } finally {
      set({ loading: false })
    }
  },

  login: async (form) => {
    const { setValidationErrors, clearValidationErrors } = useCommonStore.getState()
    try {
      set({ loading: true, error: null })
      clearValidationErrors()

      const { user, access_token } = await loginUser(form)
      localStorage.setItem('token', access_token)
      // Cookies.set('token', access_token, { expires: 7 })
      window.location.pathname = '/dashboard'

      set({ user })
    } catch (err: any) {
      const validation = err?.response?.data?.errors
      if (validation) {
        const flatErrors = Object.values(validation).flat().filter(e => typeof e === 'string') as string[]
        setValidationErrors(flatErrors)
      } else {
        set({ error: err?.response?.data?.message || 'Login failed' })
      }
    } finally {
      set({ loading: false })
    }
  },

  loadUser: async () => {
    try {
      set({ loading: true })
      const user = await fetchUser()
      set({ user, error: null })
    } catch {
      set({ user: null, error: 'Failed to load user' })
    } finally {
      set({ loading: false })
    }
  },

  logout: async () => {
    try {
      await logoutUser()
    } catch {}

    localStorage.removeItem('token')
    set({ user: null, error: null, loading: false })
    window.location.pathname = '/'
  }

}
))
