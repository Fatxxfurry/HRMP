import { AppSidebar } from "@/components/app-sidebar"

import { Separator } from "@/components/ui/separator"
import AttendanceButton from "@/components/defined/AttendanceButton"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { BrowserRouter as Router, Routes, Route } from "react-router"

import { useAuth } from "../context/AuthContext" 
import { Outlet } from "react-router";

export default function Dashboard() {
  const { user } = useAuth()


  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <AttendanceButton/>
            <span className="ml-4 font-medium">{user?.role === "admin" ? "Admin Dashboard" : "User Dashboard"}</span>
          </div>
        </header>
       <Outlet/>
      </SidebarInset>
    </SidebarProvider>
  )
}
