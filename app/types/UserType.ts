// types/UserType.ts

export interface UserType {
  id?: number
  name: string
  email: string
  password: string
  password_confirmation?: string
  role?: string
  is_active?: boolean | number
  createdAt?: string
  updatedAt?: string
  is_suspended?: boolean
  username?: string
}
