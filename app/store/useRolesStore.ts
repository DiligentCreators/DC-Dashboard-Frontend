import { create } from 'zustand'
import { showSuccess, showError } from '@/lib/toast'
import { useCommonStore } from './commonStore'
import {
  fetchRoles,
  fetchTrashRoles,
  createRole,
  updateRole,
  softDeleteRole,
  forceDeleteRole,
  restoreRole,
} from '@/app/services/roleService'
import { RoleType } from '@/app/types/RoleType'

type RolePayload = {
  name: string
  permissions?: string[]
}

type RoleStore = {
  roles: RoleType[] | null
  trashRoles: RoleType[] | null
  loading: boolean
  error: string | null

  AdminFetchRoles: () => Promise<void>
  AdminFetchTrashRoles: () => Promise<void>
  AdminCreateRole: (payload: RolePayload) => Promise<boolean>
  AdminUpdateRole: (id: number | string, payload: RolePayload) => Promise<boolean>
  AdminSoftDeleteRole: (id: number | string) => Promise<void>
  AdminRestoreRole: (id: number | string) => Promise<void>
  AdminForceDeleteRole: (id: number | string) => Promise<void>
}

export const useRoleStore = create<RoleStore>((set, get) => ({
  roles: null,
  trashRoles: null,
  loading: false,
  error: null,

  AdminFetchRoles: async () => {
    const { setValidationErrors, clearValidationErrors } = useCommonStore.getState()
    try {
      set({ loading: true, error: null })
      clearValidationErrors()
      const roles = await fetchRoles()
      set({ roles })
    } catch (err: any) {
      const validation = err?.response?.data?.errors
      if (validation) {
        setValidationErrors(Object.values(validation).flat() as string[])
      } else {
        set({ error: err?.response?.data?.message || 'Fetching roles failed' })
      }
    } finally {
      set({ loading: false })
    }
  },

  AdminFetchTrashRoles: async () => {
    const { setValidationErrors, clearValidationErrors } = useCommonStore.getState()
    try {
      set({ loading: true, error: null })
      clearValidationErrors()
      const trashRoles = await fetchTrashRoles()
      set({ trashRoles })
    } catch (err: any) {
      const validation = err?.response?.data?.errors
      if (validation) {
        setValidationErrors(Object.values(validation).flat() as string[])
      } else {
        set({ error: err?.response?.data?.message || 'Fetching trashed roles failed' })
      }
    } finally {
      set({ loading: false })
    }
  },

  AdminCreateRole: async (payload) => {
    const { setValidationErrors, clearValidationErrors } = useCommonStore.getState()
    try {
      set({ loading: true })
      clearValidationErrors()
      await createRole(payload)
      showSuccess('Role created successfully')
      await get().AdminFetchRoles()
      return true
    } catch (err: any) {
      const validation = err?.response?.data?.errors
      if (validation) {
        setValidationErrors(Object.values(validation).flat() as string[])
      } else {
        showError('Failed to create role')
      }
      return false
    } finally {
      set({ loading: false })
    }
  },

  AdminUpdateRole: async (id, payload) => {
    const { setValidationErrors, clearValidationErrors } = useCommonStore.getState()
    try {
      set({ loading: true })
      clearValidationErrors()
      await updateRole(id, payload)
      showSuccess('Role updated successfully')
      await get().AdminFetchRoles()
      return true
    } catch (err: any) {
      const validation = err?.response?.data?.errors
      if (validation) {
        setValidationErrors(Object.values(validation).flat() as string[])
      } else {
        showError('Failed to update role')
      }
      return false
    } finally {
      set({ loading: false })
    }
  },

  AdminSoftDeleteRole: async (id) => {
    try {
      set({ loading: true })
      await softDeleteRole(id)
      showSuccess('Role moved to trash')
      await get().AdminFetchRoles()
    } catch {
      showError('Failed to soft delete role')
    } finally {
      set({ loading: false })
    }
  },

  AdminRestoreRole: async (id) => {
    try {
      set({ loading: true })
      await restoreRole(id)
      showSuccess('Role restored successfully')
      await get().AdminFetchRoles()
    } catch {
      showError('Failed to restore role')
    } finally {
      set({ loading: false })
    }
  },

  AdminForceDeleteRole: async (id) => {
    try {
      set({ loading: true })
      await forceDeleteRole(id)
      showSuccess('Role permanently deleted')
      await get().AdminFetchRoles()
    } catch {
      showError('Failed to permanently delete role')
    } finally {
      set({ loading: false })
    }
  },
}))
