// src/page/dashboard/DashboardUsers.tsx
import { DataTableDemo } from "@/components/table/DataTableDemo"
import React from "react"


const DashboardUsers: React.FC = () => {
  return (
    <div className="p-6  rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">Manage Users</h1>
      <DataTableDemo />
    </div>
  )
}

export default DashboardUsers
