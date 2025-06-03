'use client'

import DashboardLayout from "../components/layout/DashboardLayout"
import { useAuthRedirect } from '@/hooks/useAuthRedirect'
import DynamicTable from '@/app/components/tables/DynamicTable'

const Page = () => {
  const { user, loading } = useAuthRedirect()

  if (loading || !user) return <div>Loading...</div>

  const columns = ['#', 'Name', 'Email', 'Actions']
  const data = [
    { '#': 1, Name: 'John Doe', Email: 'john@example.com', Actions: 'Edit | Delete' },
    { '#': 2, Name: 'Jane Smith', Email: 'jane@example.com', Actions: 'Edit | Delete' },
  ]

  return (
    <DashboardLayout>
      <DynamicTable columns={columns} data={data} />
    </DashboardLayout>
  )
}

export default Page
