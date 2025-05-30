"use client"
// Login Context đơn giản, tên đăng nhập admin = quyền admin và ngược lại
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import axios from "axios"
// Define user type with role
type User = {
  id: number
  name?: string
  username: string
  role: "admin" | "user"
}

// Auth context type
type AuthContextType = {
  user: User | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  login: async () => { },
  logout: () => { },
})

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Login function
  const login = async (username: string, password: string) => {
    setLoading(true)

    try {

      // Check if user exists
      const response = await axios.post("http://localhost:8080/api/login", {
        username,
        password,
      })

      const data = response.data
      const loggedInUser = {
        id: data.id,
        name: data.name,
        username: data.username,
        role: data.role,
      }
      console.log("Logged in user:", loggedInUser)
      if (loggedInUser.role === "ROLE_MANAGER") {
        loggedInUser.role = "admin"
      } else if (loggedInUser.role === "ROLE_USER") {
        loggedInUser.role = "user"
      }

      // update status 
      await axios.put(`http://localhost:8080/api/employees/${loggedInUser.id}`, {
        status: true,
      })
      // Set user in state and localStorage
      setUser(loggedInUser)
      localStorage.setItem("user", JSON.stringify(loggedInUser))
    } catch (error: any) {
      console.error("Login error:", error)
      if (axios.isAxiosError(error)) {
        console.error("API Error response:", error.response?.data)
      }
      throw error
    } finally {
      setLoading(false)
    }
  }


  // Logout function
  const logout = async () => {
    if (user) {
      await axios.put(`http://localhost:8080/api/employees/${user.id}`, {
        status: false,
      })
    }

    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext)
