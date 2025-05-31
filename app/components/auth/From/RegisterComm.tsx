'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription, CardFooter
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Input from '@/app/components/shared/Input'
import FormLayout from '@/app/components/layout/Form/FormLayout'
import { UserType } from '@/app/types/UserType'
// import { useAuthStore } from '@/app/store/useUserStore'
import FieldError from '@/app/components/Validation/FieldError'
import Link from 'next/link'
import { useAuth } from '@/app/hook/auth'


const RegisterComm = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  })

  // state
  const [credentials, setCredentials] =
    useState<UserType>(
      {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''

      })

  const [errors, setErrors] = useState<any>({})

  // handle formSubmit
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   register(credentials)
  //   // await auth.register(credentials)
  // }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    register({
      ...credentials,
      setErrors,
    })
  }




  // styling
  const cardStyle:string = "w-full max-w-md shadow-lg border border-gray-200  bg-white  rounded-xl"
  const cardHeaderStyle:string = "text-center px-8 pt-8"
  const CardTitleStyle:string = "text-2xl font-semibold text-gray-900 dark:text-white"
  const CardDescriptionStyle:string = "text-gray-600 dark:text-gray-400 mt-2"

  return (
    <FormLayout>
      <Card className={cardStyle}>
        <CardHeader className={cardHeaderStyle}>
          <CardTitle className={CardTitleStyle}>
            Welcome
          </CardTitle>
          <CardDescription className={CardDescriptionStyle}>
            Please Signup in to your account
          </CardDescription>
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

            <Input
              id="password_confirmation"
              name="password_confirmation"
              label="Re-Type Password"
              type="password"
              placeholder="********"
              value={credentials.password_confirmation}
              onChange={e =>
                setCredentials({ ...credentials, password_confirmation: e.target.value })
              }

            />

            <Button type="submit" className="w-full my-4">
              Sign Up
            </Button>
          </form>

          <CardFooter className="text-sm text-center w-full justify-center">
            Already have an account?&nbsp;
            <Link href="/" className="text-blue-600 hover:underline font-medium">
              Log in
            </Link>
          </CardFooter>

        </CardContent>
      </Card>
    </FormLayout>

  )
}

export default RegisterComm
