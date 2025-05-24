import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from "./context/AuthContext";

import router from "./routes/route.tsx";
import { RouterProvider } from "react-router";
import { PunchInProvider } from './context/AttendanceContext.tsx'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <PunchInProvider>
      <RouterProvider router={router} />
      </PunchInProvider>
    </AuthProvider>
  </StrictMode>,
)
