'use client';

import DashboardLayout from '@/app/components/layout/DashboardLayout';
import CardsComm from '@/app/components/dashboard/Cards/cardsComm';
import TableComm from '@/app/components/tables/TableComm';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';

const AdminDashboardPage = () => {
  const { user, loading } = useAuthRedirect();

  if (loading || !user) return <div>Loading...</div>;

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8">Welcome back {user.name} 🎉</h1>
        <CardsComm />
        <TableComm />
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboardPage;
