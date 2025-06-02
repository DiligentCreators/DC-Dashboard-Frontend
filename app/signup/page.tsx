'use client'
import RegisterComm from '@/app/components/auth/From/RegisterComm'
import { useGuestRedirect } from '@/hooks/useGuestRedirect'

const signup = () => {

  const { loading } = useGuestRedirect();

  if (loading) return <div>Loading...</div>;

  return (

    <>

<RegisterComm />
    </>
  )
}

export default signup
