'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Input from '@/app/components/shared/Input'
import FieldError from '@/app/components/Validation/FieldError'
import  { useUserStore } from '@/app/store/useAdminUserStore'
import { CardContent } from '@/components/ui/card'
import { RegisterPayload } from '@/app/services/authService'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const AddUserForm = () => {
const { AdminRegister, loading } = useUserStore()

  const [credentials, setCredentials] = useState<RegisterPayload>({
    name: '',
    username: '',
    is_active: true,
    email: '',
    password: '',
      password_confirmation: ''
  })

  // Handle input changes for text inputs
  const handleInputChange = (field: keyof RegisterPayload, value: string) => {
    setCredentials({ ...credentials, [field]: value })
  }

  // Handle is_active change, converting string to boolean
  const handleActiveChange = (value: string) => {
    setCredentials({ ...credentials, is_active: value === '1' })
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      // Create a copy of credentials and set password_confirmation to password
      const submitData = {
        ...credentials,
        password_confirmation: credentials.password,
      }

      await AdminRegister(submitData)

      // Reset form after successful submission
      setCredentials({
        name: '',
        username: '',
        is_active: true,
        email: '',
        password: '',
        password_confirmation: '',
      })
    } catch (err) {
      console.error('Registration failed:', err)
    }
  }

  return (
    <>


      <CardContent>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="name"
            name="name"
            label="Name"
            type="text"
            placeholder="John Doe"
            value={credentials.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
          />
          <FieldError field="name"  />

          <Input
            id="username"
            name="username"
            label="Username"
            type="text"
            placeholder="johndoe"
            value={credentials.username}
            onChange={(e) => handleInputChange('username', e.target.value)}
          />
          <FieldError field="username"  />

          <Input
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="example@gmail.com"
            value={credentials.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
          <FieldError field="email"  />

          <Input
            id="password"
            name="password"
            label="Password"
            type="password"
            placeholder="********"
            value={credentials.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
          />
          <FieldError field="password"  />

          <Select
            value={credentials.is_active ? '1' : '0'}
            onValueChange={handleActiveChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Active Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Active</SelectItem>
              <SelectItem value="0">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <FieldError field="is_active"  />

          <Button type="submit" className="w-full my-4" disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </Button>
        </form>
      </CardContent>
    </>
  )
}

export default AddUserForm
