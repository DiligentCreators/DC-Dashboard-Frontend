import API from '@/lib/api'
import { UserType } from '@/app/types/UserType'

// Payload types
export type RegisterPayload = {
  name: string
  username: string
  email: string
  password: string
  password_confirmation?: string
  is_admin?: boolean,
  is_active?: boolean,

}

export type LoginPayload = {
  email: string
  password: string
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

// Register API
export const registerUser = async (form: RegisterPayload): Promise<AuthResponse> => {
  await getCsrfCookie()
  const res = await API.post('/api/auth/register', form)
  return res.data.data // Assuming API responds with { data: { access_token, token_type, user } }
}

// Login API
export const loginUser = async (form: LoginPayload): Promise<AuthResponse> => {
  await getCsrfCookie()
  const res = await API.post('/api/auth/login', form)
  return res.data.data
}

// Fetch user from token/session
export const fetchUser = async (): Promise<UserType> => {
  const res = await API.get('/api/user')
  return res.data
}

// Logout API
export const logoutUser = async (): Promise<void> => {
  await getCsrfCookie()
  await API.post('/api/auth/logout')
}
// Register API
export const adminRegisterUser = async (form: RegisterPayload): Promise<AuthResponse> => {
  await getCsrfCookie()
  const res = await API.post('/api/admin/users', form)
  return res.data.data // Assuming API responds with { data: { access_token, token_type, user } }
}