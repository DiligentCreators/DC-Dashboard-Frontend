// hooks/useAuthRedirect.ts
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/app/store/useUserStore';

export const useAuthRedirect = () => {
  const router = useRouter();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [loading, user, router]);

  return { user, loading };
};
