'use client'

import DashboardLayout from '@/app/components/layout/DashboardLayout'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from '@/components/ui/dialog'
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import { useState } from 'react'
import AddRole from '@/app/components/role/AddRole'
import RolesList from '@/app/components/role/RolesList'


const Page = () => {

// inside the component
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { user, loading } = useAuthRedirect();

  if (loading || !user) return <div>Loading...</div>;

  return (

    <DashboardLayout>

      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Role Management
          </h2>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />
                Add New Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add New Role</DialogTitle>
              <DialogDescription>
                Fill in the details to add a new role.
              </DialogDescription>

              <AddRole onSuccess={() => setIsDialogOpen(false)} />

            </DialogContent>
          </Dialog>


        </div>

        <RolesList />
      </div>
    </DashboardLayout>
  )
}

export default Page
