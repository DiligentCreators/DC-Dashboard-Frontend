import DashboardLayout from '../components/layout/DashboardLayout'
import CardsComm from '@/app/components/dashboard/Cards/cardsComm'
import TableComm from '@/app/components/tables/TableComm'
const AdminDashboardPage = () => {



  return (
    <DashboardLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8">Welcome Admin! 🎉</h1>

        {/* Stats Cards */}
       <CardsComm />

        {/* Invoices Table */}
        <TableComm />

      </div>
    </DashboardLayout>
  )
}

export default AdminDashboardPage
