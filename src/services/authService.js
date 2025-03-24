import { requestApiPublic } from "../utils/requestApi"
import { jwtDecode } from "jwt-decode"

const AuthService = {
  loginWithGoogle: async () => {
    try {
      const res = await requestApiPublic.get(`/provide/google`)
      // console.log(res);
      if (!res || !res.data) throw new Error("Không nhận được dữ liệu từ API")

      return res.data
    } catch (err) {
      console.error("Lỗi khi đăng nhập Google:", err)
      throw err
    }
  },

  loginWithLocal: async (username, password) => {
    try {
      const res = await requestApiPublic.post('/auth/login', { username, password })
      if (res?.data?.token?.accessToken) {
        const { accessToken } = res.data.token
        const userInfo = jwtDecode(accessToken)

        localStorage.setItem('accessToken', accessToken)
        return userInfo
      } else {
        throw new Error('Đăng nhập thất bại')
      }
    } catch (err) {
      console.error("Lỗi khi đăng nhập Local:", err)
      throw err
    }
  },

  register: async (userData) => {
    try {
      const response = await requestApiPublic.post("/auth/register", userData)
      return response.data
    } catch (error) {
      console.error("Register failed:", error)
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken")
    window.location.replace("/login")
  },
}

export default AuthService