import { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'
const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const isAuthenticated = !!user

  // Tự động check token khi app khởi động
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      try {
        const decodedUser = jwtDecode(token)
        setUser(decodedUser)
      } catch (err) {
        console.error('Token không hợp lệ:', err)
        localStorage.removeItem('accessToken')
      }
    }
  }, [])

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserProvider, UserContext }
