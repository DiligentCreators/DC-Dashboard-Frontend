// services/authService.ts

import API from '@/lib/api'
import { UserType } from '@/app/types/UserType'

// Register payload and response types
export type RegisterPayload = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

export type LoginPayload = {
  email: string
  password: string
}

export type AuthResponse = {
  user: UserType
  token: string
}

// Register API
export const registerUser = async (
  form: RegisterPayload
): Promise<AuthResponse> => {
  const res = await API.post<AuthResponse>('/register', form)
  return res.data.data
}

// Login API
export const loginUser = async (
  form: LoginPayload
): Promise<AuthResponse> => {
  const res = await API.post<AuthResponse>('/login', form)
  return res.data.data
}

// Fetch user from token
export const fetchUser = async (): Promise<UserType> => {
  const res = await API.get<UserType>('/user')
  return res.data.data
}
