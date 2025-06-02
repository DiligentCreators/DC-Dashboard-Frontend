'use client'

import DashboardLayout from "../components/layout/DashboardLayout";
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
const page = () => {
  const { user, loading } = useAuthRedirect();
  if (loading || !user) return <div>Loading...</div>;
  return (
    <div>
      <DashboardLayout>
        <h1>settings</h1>
      </DashboardLayout>
    </div>
  );
};

export default page;
