'use client';

import DashboardLayout from '@/app/components/layout/DashboardLayout';
import { useRoleStore } from '@/app/store/useRolesStore';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, Undo2 } from 'lucide-react';

const TrashUsersTable = () => {
  const { loading, trashRoles, AdminFetchTrashRoles, AdminForceDeleteRole } = useRoleStore();

  useEffect(() => {
    AdminFetchTrashRoles();
  }, [AdminFetchTrashRoles]);

  const handleForceDelete = async (id: number) => {
    await AdminForceDeleteRole(id);
    await AdminFetchTrashRoles();
  };

  return (
    <DashboardLayout>
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Trashed Users</h2>

        {loading ? (
          <p>Loading...</p>
        ) : trashRoles?.length === 0 ? (
          <p className="text-muted-foreground">No trashed users found.</p>
        ) : (
          <table className="w-full text-sm border rounded-md">
            <thead className="bg-muted text-left">
            <tr>
              <th className="p-2">#</th>
              <th className="p-2">Name</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
            </thead>
            <tbody>
            {trashRoles?.map((role, index) => (
              <tr key={role.id} className="border-t">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{role.name}</td>
                <td className="p-2 flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <Undo2 className="w-4 h-4 mr-1" />
                    Restore
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleForceDelete(role.id)}
                  >
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
    </DashboardLayout>
  );
};

export default TrashUsersTable;
