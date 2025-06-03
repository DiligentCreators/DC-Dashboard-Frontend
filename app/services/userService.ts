import API from '@/lib/api'
import { UserType } from '@/app/types/UserType'

// Payload types
export type RegisterPayload = {
  name: string
  username: string
  email: string
  password: string
  password_confirmation?: string
  is_admin?: boolean
  is_active?: boolean
}

export type UpdateUserPayload = Partial<RegisterPayload> // allow updating any field

export type AuthResponse = {
  access_token: string
  token_type: string
  user: UserType
}

// Get CSRF cookie before making state-changing requests
const getCsrfCookie = async () => {
  await API.get('/sanctum/csrf-cookie')
}

// Create user (Register)
export const adminRegisterUser = async (form: RegisterPayload): Promise<AuthResponse> => {
  await getCsrfCookie()
  const res = await API.post('/api/admin/users', form)
  return res.data.data
}

// Fetch all users
export const fetchUsers = async (): Promise<UserType[]> => {
  const res = await API.get('/api/admin/users')
  return res.data.data
}
// Fetch trash users
export const fetchTrashUsers = async (): Promise<UserType[]> => {
  const res = await API.get('/api/admin/users/trashed')
  return res.data.data
}

// Soft Delete user (move to trash)
export const softDeleteUser = async (id: number | string): Promise<void> => {
  await getCsrfCookie()
  await API.delete(`/api/admin/users/${id}`)
}

// Restore soft-deleted user
export const restoreUser = async (id: number | string): Promise<void> => {
  await getCsrfCookie()
  await API.post(`/api/admin/users/${id}/restore`)
}

// Permanently delete user
export const forceDeleteUser = async (id: number | string): Promise<void> => {
  await getCsrfCookie()
  await API.delete(`/api/admin/users/${id}/force`)
}

// Update user
export const updateUser = async (id: number | string, payload: UpdateUserPayload): Promise<UserType> => {
  await getCsrfCookie()
  const res = await API.put(`/api/admin/users/${id}`, payload)
  return res.data.data
}
