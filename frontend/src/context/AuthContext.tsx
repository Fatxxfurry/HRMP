"use client"
// Login Context đơn giản, tên đăng nhập admin = quyền admin và ngược lại
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Define user type with role
type User = {
  id: string
  name: string
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
  login: async () => {},
  logout: () => {},
})

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    // Simulate fetching user from storage or API
    const checkAuth = async () => {
      try {
        // In a real app, fetch the user from an API or local storage
        const storedUser = localStorage.getItem("user")

        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = async (username: string, password: string) => {
    setLoading(true)

    try {

      const mockUsers = {
        "admin": {
          id: "1", 
          name: "Admin User",
          username: "admin",
          
          role: "admin",
        },
        "user": {
          id: "2",
          name: "Regular User",
          username: "user",
          role: "user",
        },
      }

      // Check if user exists
      const foundUser = mockUsers[username as keyof typeof mockUsers]

      if (!foundUser) {
        throw new Error("User not found")
      }


      // Set user in state and localStorage
      setUser(foundUser as User)
      localStorage.setItem("user", JSON.stringify(foundUser))
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Logout function
  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  return <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
}

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext)
