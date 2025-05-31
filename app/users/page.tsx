'use client'; // Add this at the very top

import DashboardLayout from "../components/layout/DashboardLayout";
import TableComm from '@/app/components/tables/TableComm'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog"

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Input from '@/app/components/shared/Input'
import FieldError from '@/app/components/Validation/FieldError'
import { useAuthStore } from '@/app/store/useUserStore'
import { UserType } from '@/app/types/UserType'
import { useState } from 'react'
const Page = () => {
  // styling
  // const cardStyle:string = "w-full max-w-md shadow-lg border border-gray-200  bg-white  rounded-xl"
  const cardHeaderStyle:string = "text-center px-8 pt-8"
  // const CardTitleStyle:string = "text-2xl font-semibold text-gray-900 dark:text-white"
  // const CardDescriptionStyle:string = "text-gray-600 dark:text-gray-400 mt-2"

  const auth = useAuthStore()

  // state
  const [credentials, setCredentials] =
    useState<UserType>(
      {
        name: '',
        email: '',
        password: '',
        // password_confirmation: ''

      })

  // handle formSubmit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await auth.register(credentials)
  }
  return (
    <DashboardLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            User Management
          </h2>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogDescription>
                    <CardHeader className={cardHeaderStyle}>
                      <CardTitle>
                        <h1 className="text-lg">Add Client</h1>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="px-8">
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                          id="name"
                          name="name"
                          label="Name"
                          type="text"
                          placeholder="jone deow"
                          value={credentials.name}
                          onChange={e =>
                            setCredentials({ ...credentials, name: e.target.value })
                          }

                        />
                        <FieldError field="name"  />

                        <Input
                          id="email"
                          name="email"
                          label="Email"
                          type="email"
                          placeholder="example@gmail.com"
                          value={credentials.email}
                          onChange={e =>
                            setCredentials({ ...credentials, email: e.target.value })
                          }


                        />
                        <FieldError field="email"  />


                        <Input
                          id="password"
                          name="password"
                          label="Password"
                          type="password"
                          placeholder="********"
                          value={credentials.password}
                          onChange={e =>
                            setCredentials({ ...credentials, password: e.target.value })
                          }

                        />
                        <FieldError field="password"  />

                        <Button type="submit" className="w-full my-4">
                          Add
                        </Button>
                      </form>



                    </CardContent>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <TableComm />
      </div>
    </DashboardLayout>
  );
};

export default Page;