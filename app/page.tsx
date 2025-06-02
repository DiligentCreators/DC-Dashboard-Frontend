'use client'

import LoginComm from '@/app/components/auth/From/LoginComm';
import { useGuestRedirect } from '@/hooks/useGuestRedirect';

const Login = () => {
  const { loading } = useGuestRedirect();

  if (loading) return <div>Loading...</div>;

  return <LoginComm />;
};

export default Login;
