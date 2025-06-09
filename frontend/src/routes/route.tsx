import { BrowserRouter, createBrowserRouter, Navigate } from "react-router";
import App from '../App'
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
import EmployeeInfo from "@/pages/TabEmployee/EmployeeInfo"
import EmployeeRequest from "@/pages/TabEmployee/EmployeeRequest"
import RequestHistory from "@/components/defined/RequestHistory"
import RequestDetail from "@/components/defined/RequestDetail"
import RoleProtectedRoute from "./ProtectedRoute";
import EmployeeTimekeeping from "@/pages/TabTimeKeeping/EmployeeTimekeeping";
import Login from "@/pages/Login/Login";
import Dashboard from "@/layout/dashboard";
import EmployeePayment from "@/pages/TabEmployee/EmployeePayment";
import Policies from "@/pages/TabEmployee/Policies";
import EmployeeManagement from "@/pages/TabManagement/EmployeeManagement";
import EmployeeNotification from "@/pages/TabManagement/EmployeeNotification";
import Unauthorized from "@/components/defined/Unauthorized";
import AdminEmployeeInfo from "@/pages/TabEmployee/AdminEmployeeInfo";
import UpdateEmployee from "@/components/defined/UpdateEmployee";
import UpdateEmployeeSalary from "@/components/defined/UpdateEmployeeSalary";
import AddSalary from "@/components/defined/AddSalary";
import FaceRecognition from "@/components/defined/FaceRecognition";
import EmployeeCalendar from "@/pages/TabManagement/EmployeeCalendar";
import OverallSetting from "@/pages/TabSetting/OverallSetting";
import AddProject from "@/components/defined/AddProject";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/face-recognition",
    element: <FaceRecognition />,
  },

  {
    path: "/admin",
    element: <RoleProtectedRoute allowedRoles={["admin"]} />,
    children: [
      {
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <AdminTimekeeping />,
          },
          {
            path: "timekeeping",
            element: <AdminTimekeeping />,
          },
          {
            path: "request",
            element: <AdminRequest />,
          },
          {
            path: "employeeinfo",
            element: <AdminInfo />,
          },
          {
            path: "employee-detail/:id",
            element: <AdminEmployeeInfo />,
          },
          {
            path: "policies",
            element: <Policies />,
          },
          {
            path: "payment",
            element: <AdminPayment />,
          },
          {
            path: "project-management",
            element: <AdminManagement />,
          },
          {
            path: "tasks-management",
            element: <AdminAssigntask />,
          },
          {
            path: "notification",
            element: <AdminNotification />,
          },
          {
            path: "notification-detail",
            element: <NotificationDetail />,
          },
          {
            path: "request-detail",
            element: <RequestDetail />,
          },
          {
            path: "add-employee",
            element: <AddEmployee />,
          },
          {
            path: "edit-employee/:id",
            element: <UpdateEmployee />,
          },
          {
            path: "edit-salary/:id",
            element: <UpdateEmployeeSalary />
          },
          {
            path: "add-salary/",
            element: <AddSalary />
          },
          {
            path: "calendar",
            element: <CalendarManagement />,
          },
          {
            path: "setting",
            element: <OverallSetting />,
          },
          {
            path: "add-project/",
            element: <AddProject />,
          }
        ],
      },
    ],
  },
  {
    path: "/user",
    element: <RoleProtectedRoute allowedRoles={["user"]} />,
    children: [
      {
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <EmployeeTimekeeping />,
          },
          {
            path: "timekeeping",
            element: <EmployeeTimekeeping />,
          },
          {
            path: "request",
            element: <EmployeeRequest />,
          },
          {
            path: "employeeinfo",
            element: <EmployeeInfo />,
          },
          {
            path: "policies",
            element: <Policies />,
          },
          {
            path: "payment",
            element: <EmployeePayment />,
          },
          {
            path: "project-management",
            element: <EmployeeManagement />,
          },
          {
            path: "tasks-management",
            element: <Unauthorized />,
          },
          {
            path: "notification",
            element: <EmployeeNotification />,
          },
          {
            path: "notification-detail",
            element: <NotificationDetail />,
          },
          {
            path: "request-detail",
            element: <RequestDetail />,
          },
          {
            path: "calendar",
            element: <EmployeeCalendar />,
          },
          {
            path: "setting",
            element: <OverallSetting />,
          }
        ],
      },
    ],
  },
])

export default router
