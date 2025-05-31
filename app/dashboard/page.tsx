'use client'

import DashboardLayout from '../components/layout/DashboardLayout'
import CardsComm from '@/app/components/dashboard/Cards/cardsComm'
import TableComm from '@/app/components/tables/TableComm'
import { useAuth } from '@/app/hook/auth'
const AdminDashboardPage = () => {

  const { user, isLoading } = useAuth({ middleware: 'auth' })

  if (isLoading || !user) {
    return <div>Loading...</div>
  }

  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8">welcome back {user?.name} 🎉</h1>

        {/* Stats Cards */}
       <CardsComm />

        {/* Invoices Table */}
        <TableComm />

      </div>
    </DashboardLayout>
  )
}

export default AdminDashboardPage
