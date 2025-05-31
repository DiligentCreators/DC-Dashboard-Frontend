"use client";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Edit, Trash2 } from 'lucide-react'

function TableComm() {
  type UserStatus = "Active" | "Inactive" | "Banned";

  interface User {
    id: string;
    name: string;
    email: string;
    status: UserStatus;
  }

  const users: User[] = [
    {
      id: "USR001",
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
    },
    {
      id: "USR002",
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Inactive",
    },
    {
      id: "USR003",
      name: "Ali Khan",
      email: "ali.khan@example.com",
      status: "Banned",
    },
    {
      id: "USR004",
      name: "Emma Watson",
      email: "emma@example.com",
      status: "Active",
    },
  ];

  const statusColor: Record<UserStatus, string> = {
    Active: "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-200",
    Inactive: "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-200",
    Banned: "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-200",
  };

  const handleEdit = (id: string) => {
    console.log("Edit user", id);
    // navigate or open modal here
  };

  const handleDelete = (id: string) => {
    console.log("Delete user", id);
    // show confirmation & call delete API here
  };
  return (
    <>
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
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
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
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
                      className={`px-3 py-1 text-xs font-medium rounded-full ${statusColor[user.status]}`}
                    >
                      {user.status}
                    </span>
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
          ))}
        </TableBody>
      </Table>
      </div>

    </>
  )
}

export default TableComm