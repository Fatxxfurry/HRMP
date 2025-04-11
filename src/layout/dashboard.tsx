import { AppSidebar } from "@/components/app-sidebar"

import { Separator } from "@/components/ui/separator"
import AttendanceButton from "@/components/defined/AttendanceButton"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import AdminTimekeeping from "@/pages/TabTimeKeeping/AdminTimekeeping"
import AdminManagement from "@/pages/TabManagement/AdminManagement"
import CalendarManagement from "@/pages/TabManagement/CalendarManagement"
import AdminAssigntask from "@/pages/TabManagement/AdminAssigntask"
import AdminNotification from "@/pages/TabManagement/AdminNotification"
export default function Dashboard() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <AttendanceButton/>
          </div>
        </header>
        <AdminNotification/>
      </SidebarInset>
    </SidebarProvider>
  )
}
