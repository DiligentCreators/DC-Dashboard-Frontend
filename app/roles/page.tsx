import DashboardLayout from "../components/layout/DashboardLayout";
import TableComm from '@/app/components/tables/TableComm'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
const page = () => {
  return (
    <div>
      <DashboardLayout>

        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Roles Management
            </h2>
            <Button className="flex items-center gap-2">
              <PlusCircle className="w-5 h-5" />
              Add User
            </Button>
          </div>


          <TableComm />

        </div>

      </DashboardLayout>
    </div>
  );
};

export default page;
