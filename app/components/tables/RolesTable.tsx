'use client'

import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
// import { Edit, Trash2 } from 'lucide-react'
import { useRoleStore } from '@/app/store/useRolesStore'
import { confirmDelete } from '@/lib/confirmDelete'
import { showError, showSuccess } from '@/lib/toast'
import { Edit, Trash2 } from 'lucide-react'
import { RoleType } from '@/app/types/RoleType'
import EditRole from '@/app/components/role/EditRole'
// import { softDeleteRole } from '@/app/services/roleService'

function RolesTable() {
  const { AdminFetchRoles,AdminSoftDeleteRole,roles, loading } = useRoleStore()

  // Fetch roles on component mount
  useEffect(() => {
    AdminFetchRoles()
  }, [AdminFetchRoles])

  const [editingUser, setEditingUser] = useState<RoleType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Explicit dialog state

  const handleEdit = (user: RoleType | null = null) => {
    setEditingUser(user);
    setIsDialogOpen(!!user); // Open dialog if user is provided
  };

  const handleDelete = async (id: number, name: string) => {
    const confirmed = await confirmDelete(name);
    if (!confirmed) return;

    try {
      await AdminSoftDeleteRole(id);
      showSuccess('User deleted successfully');
      AdminFetchRoles()

    } catch (err) {
      showError('Failed to delete user');
    }
  };
  const handleEditSuccess = async () => {
    setEditingUser(null);
    setIsDialogOpen(false);
    await AdminFetchRoles();
    showSuccess('User updated successfully');
  };
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-gray-500">
      <Table>
        <TableCaption className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          A list of available roles.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Role ID</TableHead>
            <TableHead>Role Name</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : roles && roles.length > 0 ? (
            roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>{role.id}</TableCell>
                <TableCell>{role.name}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(role)}>
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="destructive" onClick={() => handleDelete(role.id,role.name)}>
                    <Trash2 className="w-4 h-4 mr-1" />
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No roles found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <EditRole
        role={editingUser}
        open={isDialogOpen}
        onClose={() => {
          setEditingUser(null);
          setIsDialogOpen(false);
        }}
        onSuccess={handleEditSuccess}
      />
    </div>
  )
}

export default RolesTable
