import { create } from 'zustand'
import { RegisterPayload } from '@/app/services/authService'
import { UserType } from '@/app/types/UserType'
import { useCommonStore } from './commonStore'
import { adminRegisterUser, fetchUsers } from '@/app/services/userService'

type UserStore = {
  users: UserType[] | null
  loading: boolean
  error: string | null
  AdminRegister: (form: RegisterPayload) => Promise<void>
  AdminFetchUsers: () => Promise<void>
}

export const useUserStore = create<UserStore>((set) => ({
  users: null,
  loading: false,
  error: null,

  AdminRegister: async (form) => {
    const { setValidationErrors, clearValidationErrors } = useCommonStore.getState()

    try {
      set({ loading: true, error: null })
      clearValidationErrors()
      await adminRegisterUser(form)
    } catch (err: any) {
      const validation = err?.response?.data?.errors
      if (validation) {
        const flatErrors = Object.values(validation)
          .flat()
          .filter((e) => typeof e === 'string') as string[]
        setValidationErrors(flatErrors)
      } else {
        set({ error: err?.response?.data?.message || 'Registration failed' })
      }
    } finally {
      set({ loading: false })
    }
  },

  AdminFetchUsers: async () => {
    const { setValidationErrors, clearValidationErrors } = useCommonStore.getState()

    try {
      set({ loading: true, error: null })
      clearValidationErrors()

      const users = await fetchUsers()
      set({ users })
    } catch (err: any) {
      const validation = err?.response?.data?.errors
      if (validation) {
        const flatErrors = Object.values(validation)
          .flat()
          .filter((e) => typeof e === 'string') as string[]
        setValidationErrors(flatErrors)
      } else {
        set({ error: err?.response?.data?.message || 'Fetching users failed' })
      }
    } finally {
      set({ loading: false })
    }
  }
}))
