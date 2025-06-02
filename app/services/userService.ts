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

export type AuthResponse = {
  access_token: string
  token_type: string
  user: UserType
}

// Get CSRF cookie before making state-changing requests
const getCsrfCookie = async () => {
  await API.get('/sanctum/csrf-cookie')
}

// Register API - create new user
export const adminRegisterUser = async (form: RegisterPayload): Promise<AuthResponse> => {
  await getCsrfCookie()
  const res = await API.post('/api/admin/users', form)
  return res.data.data // { access_token, token_type, user }
}

// Fetch all users API
export const fetchUsers = async (): Promise<UserType[]> => {
  const res = await API.get('/api/admin/users')
  return res.data.data // Assuming API returns { data: [UserType, ...] }
}
