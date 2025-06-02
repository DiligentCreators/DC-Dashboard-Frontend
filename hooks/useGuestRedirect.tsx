// hooks/useGuestRedirect.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/useUserStore';

export const useGuestRedirect = () => {
  const router = useRouter();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard'); // redirect logged-in users away from login/register
    }
  }, [loading, user, router]);

  return { user, loading };
};
