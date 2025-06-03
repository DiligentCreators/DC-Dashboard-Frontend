'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Trash2, Undo2 } from 'lucide-react'
import { useUserStore } from '@/app/store/useAdminUserStore'

const TrashedUsers = () => {
  const {
    trashUsers,
    loading,
    AdminFetchTrashUsers,
    AdminRestoreUser,
    AdminForceDeleteUser,
  } = useUserStore()

  useEffect(() => {
    AdminFetchTrashUsers()
  }, [AdminFetchTrashUsers])

  const handleRestore = async (id: number) => {
    await AdminRestoreUser(id)
    await AdminFetchTrashUsers()
  }

  const handleForceDelete = async (id: number) => {
    await AdminForceDeleteUser(id)
    await AdminFetchTrashUsers()
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Trashed Users</h2>

      {loading ? (
        <p>Loading...</p>
      ) : trashUsers?.length === 0 ? (
        <p className="text-muted-foreground">No trashed users found.</p>
      ) : (
        <table className="w-full text-sm border rounded-md">
          <thead className="bg-muted text-left">
          <tr>
            <th className="p-2">#</th>
            <th className="p-2">Name</th>
            <th className="p-2">Email</th>
            <th className="p-2">Deleted At</th>
            <th className="p-2 text-right">Actions</th>
          </tr>
          </thead>
          <tbody>
          {trashUsers?.map((user, index) => (
            <tr key={user.id} className="border-t">
              <td className="p-2">{index + 1}</td>
              <td className="p-2">{user.name}</td>
              <td className="p-2">{user.email}</td>
              {/*<td className="p-2">{new Date(user.deleted_at!).toLocaleString()}</td>*/}
              <td className="p-2 flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => handleRestore(user.id)}>
                  <Undo2 className="w-4 h-4 mr-1" />
                  Restore
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleForceDelete(user.id)}>
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default TrashedUsers
