// stores/authStore.ts
import { create } from 'zustand'
import { registerUser, loginUser, fetchUser } from '@/app/services/authService'
import { LoginFormType, RegisterFormType } from '@/app/types/AuthFormTypes'
import { UserType } from '@/app/types/UserType'
import { useCommonStore } from './commonStore'

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
    const { setValidationErrors, clearValidationErrors } = useCommonStore.getState()
    try {
      set({ loading: true, error: null })
      clearValidationErrors()

      const data = await registerUser(form)
      localStorage.setItem('token', data.token)
      set({ user: data.user })
   } catch (err: any) {
  const validation = err?.response?.data?.errors
  if (validation) {
    const flatErrors = Object.values(validation).flat().filter(e => typeof e === 'string') as string[]
    setValidationErrors(flatErrors)
  } else {
    set({ error: err.response?.data?.message || 'Registration failed' })
  }
}

},
  login: async (form) => {
    const { setValidationErrors, clearValidationErrors } = useCommonStore.getState()
    try {
      set({ loading: true, error: null })
      clearValidationErrors()

      const data = await loginUser(form)

      // Save token and user info
      localStorage.setItem('token', data.token)
      set({ user: data.user })
    } catch (err: any) {
      const validation = err?.response?.data?.errors
      if (validation) {
        // Laravel-style validation errors
        const flatErrors = Object.values(validation).flat().filter(e => typeof e === 'string') as string[]
        setValidationErrors(flatErrors)
      } else {
        // General error like invalid credentials
        const message = err?.response?.data?.message || 'Login failed'
        set({ error: message })
      }
    } finally {
      set({ loading: false })
    }
  },

  loadUser: async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        set({ user: null, error: null })
        return
      }

      set({ loading: true, error: null })
      const user = await fetchUser()
      set({ user, error: null })
    } catch {
      set({ user: null, error: 'Failed to load user' })
    } finally {
      set({ loading: false })
    }
  },

  logout: () => {
    localStorage.removeItem('token')
    set({ user: null, error: null, loading: false })
  },


}))
