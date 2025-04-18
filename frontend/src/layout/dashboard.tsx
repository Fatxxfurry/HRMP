import { AppSidebar } from "@/components/app-sidebar"

import { Separator } from "@/components/ui/separator"
import AttendanceButton from "@/components/defined/AttendanceButton"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { BrowserRouter as Router, Routes, Route } from "react-router"
import AdminTimekeeping from "@/pages/TabTimeKeeping/AdminTimekeeping"
import AdminManagement from "@/pages/TabManagement/AdminManagement"
import CalendarManagement from "@/pages/TabManagement/CalendarManagement"
import AdminAssigntask from "@/pages/TabManagement/AdminAssigntask"
import AdminNotification from "@/pages/TabManagement/AdminNotification"
import AdminInfo from "@/pages/TabEmployee/AdminInfo"
import AdminRequest from "@/pages/TabEmployee/AdminRequest"
import NotificationDetail from "@/components/defined/NotificationDetail"
import AdminPayment from "@/pages/TabEmployee/AdminPayment"
import AddEmployee from "@/components/defined/AddEmployee"
const mockData = {
  senderName: "Nguyễn Văn A",
  senderEmail: "vana@company.vn",
  department: "Phòng Kế Toán",
  content: "Vui lòng xem kỹ thông báo về thay đổi trong quy trình thanh toán.",
  attachments: [
    {
      name: "Quy-trinh-moi.pdf",
      url: "/files/quy-trinh-moi.pdf",
    },
  ],
}
export default function Dashboard() {
  return (
    <Router> 
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
        <Routes>
              <Route path="/status" element={<AdminTimekeeping />} />
              <Route path="/add-employee" element={<AddEmployee />} />
              <Route path="/request" element={<AdminRequest/>} />
              <Route path="/request-detail" element={<NotificationDetail NotificationData={mockData}/>} />
              <Route path="/payment" element={<AdminPayment/>} />
              <Route path="/employeeinfo" element={<AdminInfo/>} />
              <Route path="/project-management" element={<AdminManagement/>} />
              <Route path="/tasks-management" element={<AdminAssigntask/>} />
              <Route path="/notification" element={<AdminNotification/>} />
            </Routes>
      </SidebarInset>
    </SidebarProvider>
     </Router>
  )
}
