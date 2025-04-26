"use client"

import { useEffect } from "react"
import { Navigate, Outlet, useNavigate } from "react-router"
import { useAuth } from "../context/AuthContext"

interface RoleProtectedRouteProps {
  allowedRoles: Array<"admin" | "user">
}

export default function RoleProtectedRoute({ allowedRoles }: RoleProtectedRouteProps) {
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // If user is logged in but not allowed for this route, redirect to their appropriate dashboard
    if (user && !loading && !allowedRoles.includes(user.role)) {
      navigate(`/${user.role}`)
    }
  }, [user, loading, allowedRoles, navigate])

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  // If not logged in, redirect to login
  if (!user && !loading) {
    return <Navigate to="/login" replace />
  }

  // If user is logged in and has the correct role, render the children
  if (user && allowedRoles.includes(user.role)) {
    return <Outlet />
  }

  // Fallback - should not reach here
  return <Navigate to="/login" replace />
}
