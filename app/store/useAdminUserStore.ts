import { create } from 'zustand'
import { fetchTrashUsers, RegisterPayload, UpdateUserPayload } from '@/app/services/userService'
import { UserType } from '@/app/types/UserType'
import { useCommonStore } from './commonStore'
import {
  adminRegisterUser,
  fetchUsers,
  softDeleteUser,
  restoreUser,
  forceDeleteUser,
  updateUser
} from '@/app/services/userService'
import { showSuccess, showError } from '@/lib/toast'

type UserStore = {
  users: UserType[] | null
  trashUsers: UserType[] | null

  loading: boolean
  error: string | null
  AdminRegister: (form: RegisterPayload) => Promise<boolean>
  AdminFetchUsers: () => Promise<void>
  AdminFetchTrashUsers: () => Promise<void>
  AdminSoftDeleteUser: (id: number | string) => Promise<void>
  AdminRestoreUser: (id: number | string) => Promise<void>
  AdminForceDeleteUser: (id: number | string) => Promise<void>
  AdminUpdateUser: (id: number | string, payload: UpdateUserPayload) => Promise<boolean>
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: null,
  trashUsers: null,
  loading: false,
  error: null,

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
  },

  AdminFetchTrashUsers: async () => {
    const { setValidationErrors, clearValidationErrors } = useCommonStore.getState()

    try {
      set({ loading: true, error: null })
      clearValidationErrors()
      const trashUsers = await fetchTrashUsers()
      set({ trashUsers })
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
  },

  AdminRegister: async (form) => {
    const { setValidationErrors, clearValidationErrors } = useCommonStore.getState()

    try {
      set({ loading: true, error: null })
      clearValidationErrors()
      await adminRegisterUser(form)
      showSuccess('User added successfully!')
      await get().AdminFetchUsers()

      return true
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
      showError('Something went wrong.')
      return false
    } finally {
      set({ loading: false })
    }
  },

  AdminSoftDeleteUser: async (id) => {
    try {
      set({ loading: true })
      await softDeleteUser(id)
      showSuccess('User moved to trash!')
      await get().AdminFetchUsers()
    } catch (err) {
      showError('Failed to delete user')
    } finally {
      set({ loading: false })
    }
  },

  AdminRestoreUser: async (id) => {
    try {
      set({ loading: true })
      await restoreUser(id)
      showSuccess('User restored successfully!')
      await get().AdminFetchUsers()
    } catch (err) {
      showError('Failed to restore user')
    } finally {
      set({ loading: false })
    }
  },

  AdminForceDeleteUser: async (id) => {
    try {
      set({ loading: true })
      await forceDeleteUser(id)
      showSuccess('User permanently deleted!')
      await get().AdminFetchUsers()
    } catch (err) {
      showError('Failed to permanently delete user')
    } finally {
      set({ loading: false })
    }
  },

  AdminUpdateUser: async (id, payload) => {
    const { setValidationErrors, clearValidationErrors } = useCommonStore.getState()

    try {
      set({ loading: true })
      clearValidationErrors()
      await updateUser(id, payload)
      showSuccess('User updated successfully!')
      await get().AdminFetchUsers()
      return true
    } catch (err: any) {
      const validation = err?.response?.data?.errors
      if (validation) {
        const flatErrors = Object.values(validation)
          .flat()
          .filter((e) => typeof e === 'string') as string[]
        setValidationErrors(flatErrors)
      } else {
        showError('Failed to update user')
      }
      return false

    } finally {
      set({ loading: false })
    }
  },
}))
