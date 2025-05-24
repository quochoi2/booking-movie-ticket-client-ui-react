import { requestApiPublic } from "../utils/requestApi"

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
      console.log(res.data);
      if (res?.data?.token?.accessToken) {
        localStorage.setItem('accessToken', res.data.token.accessToken)
        localStorage.setItem('user', JSON.stringify(res.data.user))
        return res.data.user
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
    localStorage.removeItem('user')
  },
}

export default AuthService