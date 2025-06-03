// services/roleService.ts
import API from '@/lib/api'
import { RoleType } from '@/app/types/RoleType'

export type CreateRolePayload = {
  name: string
  guard_name?: string
}

export type UpdateRolePayload = {
  name: string
  guard_name?: string
}

// GET: fetch all roles
export const fetchRoles = async (): Promise<RoleType[]> => {
  const { data } = await API.get('/api/admin/roles')
  return data.data
}

// GET: fetch trashed roles
export const fetchTrashRoles = async (): Promise<RoleType[]> => {
  const { data } = await API.get('/api/admin/roles/trashed')
  return data.data
}

// POST: create new role
export const createRole = async (payload: CreateRolePayload) => {
  return await API.post('/api/admin/roles', payload)
}

// PUT: update role
export const updateRole = async (id: number | string, payload: UpdateRolePayload) => {
  return await API.put(`/api/admin/roles/${id}`, payload)
}

// DELETE: soft delete
export const softDeleteRole = async (id: number | string) => {
  return await API.delete(`/api/admin/roles/${id}`)
}

// PATCH: restore soft-deleted role
export const restoreRole = async (id: number | string) => {
  return await API.patch(`/api/admin/roles/${id}/restore`)
}

// DELETE: force delete permanently
export const forceDeleteRole = async (id: number | string) => {
  return await API.delete(`/api/admin/roles/${id}/force`)
}
