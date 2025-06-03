'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import Input from '@/app/components/shared/Input'
import FieldError from '@/app/components/Validation/FieldError'
import { CardContent } from '@/components/ui/card'
import { CreateRolePayload } from '@/app/services/roleService'
import { useRoleStore } from '@/app/store/useRolesStore'

type AddRoleFormProps = {
  onSuccess: () => void;
}

const AddRoleForm = ({ onSuccess }: AddRoleFormProps) => {
  const { AdminCreateRole, loading } = useRoleStore()

  const [credentials, setCredentials] = useState<CreateRolePayload>({
    name: '',
  })

  const handleInputChange = (field: keyof CreateRolePayload, value: string) => {
    setCredentials({ ...credentials, [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const isSuccess = await AdminCreateRole(credentials)

      if (isSuccess) {
        setCredentials({ name: '' })
        onSuccess() // ✅ close dialog
      }
    } catch (err) {
      console.error('Role creation failed:', err)
    }
  }

  return (
    <CardContent>
      <form onSubmit={handleSubmit} >
        <Input
          id="name"
          name="name"
          label="Role Name"
          type="text"
          placeholder="e.g., Admin"
          value={credentials.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
        />
        <FieldError field="name" />

        <Button type="submit" className="mt-5" disabled={loading}>
          {loading ? 'Adding...' : 'Add'}
        </Button>
      </form>
    </CardContent>
  )
}

export default AddRoleForm
