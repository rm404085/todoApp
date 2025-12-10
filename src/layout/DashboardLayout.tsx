import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <SidebarProvider>
      <div className="flex h-screen mt-4 w-full overflow-hidden">
        {/* LEFT SIDEBAR */}
        <AppSidebar />

        {/* MAIN CONTENT */}
        <SidebarInset className="flex-1 p-4 md:p-8 bg-gray-50 dark:bg-gray-900 overflow-auto">
          <Outlet />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
