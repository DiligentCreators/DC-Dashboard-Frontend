import { create } from 'zustand'
import { registerUser, loginUser, fetchUser } from '@/app/services/authService'
import { LoginFormType, RegisterFormType } from '@/app/types/AuthFormTypes'
import { UserType } from '@/app/types/UserType'

type AuthStore = {
  user: UserType | null
  loading: boolean
  error: string | null
  register: (form: RegisterFormType) => Promise<void>
  login: (form: LoginFormType) => Promise<void>
  logout: () => void
  loadUser: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  register: async (form) => {
    try {
      set({ loading: true, error: null })
      const data = await registerUser(form)
      localStorage.setItem('token', data.token)
      set({ user: data.user })
    } catch (err) {
      const errorMsg = (err as any)?.response?.data?.message || 'Registration failed'
      set({ error: errorMsg })
    } finally {
      set({ loading: false })
    }
  },

  login: async (form) => {
    try {
      set({ loading: true, error: null })
      const data = await loginUser(form)
      localStorage.setItem('token', data.token)
      set({ user: data.user })
    } catch (err) {
      const errorMsg = (err as any)?.response?.data?.message || 'Login failed'
      set({ error: errorMsg })
    } finally {
      set({ loading: false })
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null })
  },

  loadUser: async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      set({ loading: true, error: null })
      const user = await fetchUser()
      set({ user })
    } catch (err) {
      console.error('Load user failed:', err)
      set({ user: null })
    } finally {
      set({ loading: false })
    }
  },
}))
