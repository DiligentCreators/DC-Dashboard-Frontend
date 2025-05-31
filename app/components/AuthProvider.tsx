// components/AuthProvider.tsx
'use client'

import { useEffect } from 'react';
import { UserType } from '@/app/types/UserType';
import { useAuthStore } from '@/app/store/useUserStore';

export const AuthProvider = ({
                               children,
                               user: serverUser
                             }: {
  children: React.ReactNode,
  user?: UserType | null
}) => {
  const { user: clientUser, loadUser } = useAuthStore();

  useEffect(() => {
    // Sync server state if available
    if (serverUser) {
      useAuthStore.setState({ user: serverUser });
    }

    // Only fetch if:
    // 1. No server user (not logged in)
    // OR
    // 2. Server user exists but might be stale
    if (!serverUser || shouldRefreshUser(serverUser)) {
      loadUser();
    }
  }, []);

// Helper function to determine if refresh is needed
  function shouldRefreshUser(user: UserType) {
    const lastUpdated = new Date(user.updatedAt).getTime();
    return Date.now() - lastUpdated > 300000; // 5 minutes
  }

  return <>{children}</>;
};