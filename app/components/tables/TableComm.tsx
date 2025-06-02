"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { useUserStore } from "@/app/store/useAdminUserStore";

type UserStatus = "Active" | "Inactive" | "Banned";

const statusColor: Record<UserStatus, string> = {
  Active: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
  Inactive: "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200",
  Banned: "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200",
};

const BoolBadge = ({ value }: { value?: boolean }) => {
  // value can be undefined or boolean
  const isTrue = Boolean(value);
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold ${
        isTrue
          ? "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200"
          : "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-200"
      }`}
    >
      {isTrue ? "Yes" : "No"}
    </span>
  );
};

function TableComm() {
  const users = useUserStore((state) => state.users);
  const loading = useUserStore((state) => state.loading);
  const error = useUserStore((state) => state.error);
  const AdminFetchUsers = useUserStore((state) => state.AdminFetchUsers);

  useEffect(() => {
    AdminFetchUsers();
  }, [AdminFetchUsers]);

  const handleEdit = (id: number | string) => {
    console.log("Edit user", id);
  };

  const handleDelete = (id: number | string) => {
    console.log("Delete user", id);
  };

  // Derive user status from is_active and is_suspended
  const getStatus = (user: { is_active?: boolean; is_suspended?: boolean }): UserStatus => {
    if (user.is_suspended) return "Banned";
    if (user.is_active) return "Active";
    return "Inactive";
  };

  if (loading) return <div>Loading users...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-gray-500">
      <Table>
        <TableCaption className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          A list of registered users.
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">User ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Suspended</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users && users.length > 0 ? (
            users.map((user) => {
              const status = getStatus(user);
              return (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-200">
                    {user.name}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${
                        statusColor[status]
                      }`}
                    >
                      {status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <BoolBadge value={user.is_active} />
                  </TableCell>
                  <TableCell>
                    <BoolBadge value={user.is_suspended} />
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(user.id)}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(user.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-4">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default TableComm;
