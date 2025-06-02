'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Input from '@/app/components/shared/Input'
import FormLayout from '@/app/components/layout/Form/FormLayout'
// import { UserType } from '@/app/types/UserType'
import { useAuthStore } from '@/app/store/useUserStore'
import FieldError from '@/app/components/Validation/FieldError'
// import { useAuth } from '@/app/hook/auth'
import { LoginPayload } from '@/app/services/authService'
import Link from 'next/link'

const LoginComm = () => {

  //
  // const { login } = useAuth({
  //   middleware: 'guest',
  //   redirectIfAuthenticated: '/dashboard',
  // })
  // state
const login = useAuthStore(state => state.login)
  const [credentials, setCredentials] =
    useState<LoginPayload>(
        {
          email: '',
          password: ''
      })

  // handle formSubmit
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault()
  //   await auth.login(credentials)
  // }
  // const { user } = useAuthStore()
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
   await login(credentials)
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
            Welcome Back
          </CardTitle>
          <CardDescription className={CardDescriptionStyle}>
            Please sign in to your account
          </CardDescription>
        </CardHeader>

        <CardContent className="px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <FieldError field='email'/>

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
            <FieldError field='password'/>


            <Button type="submit" className="w-full my-4">
              Sign In
            </Button>
          </form>

          <CardFooter className="text-sm text-center w-full justify-center">
            Don’t have an account?&nbsp;
            <Link href="/signup" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </CardFooter>


        </CardContent>
      </Card>
    </FormLayout>

  )
}

export default LoginComm
