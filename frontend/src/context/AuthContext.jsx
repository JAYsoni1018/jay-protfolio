import { createContext, useContext, useEffect, useState } from 'react'
import { authApi } from '../services/resources'

const AuthContext = createContext()
const authTokenKey = 'admin_token'

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

useEffect(() => {
  if (!window.location.pathname.startsWith('/admin')) {
    setLoading(false)
    return
  }
  authApi
    .me()
    .then((res) => setAdmin(res.data.data))
    .catch(() => setAdmin(null))
    .finally(() => setLoading(false))
}, [])

  const login = async (email, password) => {
    const res = await authApi.login({ email, password })
    if (res.data.token) {
      localStorage.setItem(authTokenKey, res.data.token)
    }
    setAdmin(res.data.data)
    return res.data
  }

  const logout = async () => {
    try {
      await authApi.logout()
    } finally {
      localStorage.removeItem(authTokenKey)
      setAdmin(null)
    }
  }

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)