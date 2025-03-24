import { createContext, useContext, useState } from "react"

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const isAuthenticated = !!user // neu dang nhap roi

  const login = (userData) => {
    setUser(userData)
  }

  const logout = () => {
    setUser(null);
    localStorage.removeItem("accessToken")
  }

  return (
    <UserContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  )
}

// const useAuth = () => useContext(UserContext)

export { UserProvider, UserContext }

