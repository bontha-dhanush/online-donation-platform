import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AuthContext = createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem('user')
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  // Mock authentication functions - in a real app, you would connect to a backend
  const login = (email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // In a real app, validate credentials with backend
        if (email && password) {
          const user = {
            id: '1',
            name: email.split('@')[0],
            email,
            token: 'mock-jwt-token',
          }
          
          setCurrentUser(user)
          localStorage.setItem('user', JSON.stringify(user))
          resolve(user)
        } else {
          reject(new Error('Invalid email or password'))
        }
      }, 800)
    })
  }

  const signup = (name, email, password) => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // In a real app, register user with backend
        if (name && email && password) {
          const user = {
            id: '1',
            name,
            email,
            token: 'mock-jwt-token',
          }
          
          setCurrentUser(user)
          localStorage.setItem('user', JSON.stringify(user))
          resolve(user)
        } else {
          reject(new Error('Please fill all required fields'))
        }
      }, 800)
    })
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('user')
    toast.success('Successfully logged out')
    navigate('/')
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    loading
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}