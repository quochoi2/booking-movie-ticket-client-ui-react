import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BreadcrumbHero from '../../components/BreadcrumbHero'
import AuthService from '../../services/authService'
import { message } from 'antd'

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullname: "Nguyen Van D",
    email: "cuoivui333@gmail.com",
    username: "nguyend",
    password: "111111",
    confirmPassword: "111111",
    role: "user",
  })

  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  };

  const handleRegister = async (e) => {
    e.preventDefault()
    setError("")

    const { fullname, email, username, password, confirmPassword, role } = formData

    if (!email.includes('@')) {
      setError('Email không hợp lệ.')
      return
    }

    if (username.includes(' ')) {
      setError('Tên đăng nhập không được chứa khoảng trắng.')
      return
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.')
      return
    }

    try {
      await AuthService.register({ fullname, email, username, password, role })

      message.success('Đăng ký thành công! Hãy xác thực tài khoản...')
      setTimeout(() => navigate('/vertify'), 2000);
    } catch (error) {
      setError('Đăng ký thất bại. Vui lòng kiểm tra lại.');
      console.error('Lỗi đăng ký:', error)
      message.error('Tài khoản đã tồn tại')
    }
  }

  const handleGoogleLogin = async () => {
    try {
      window.location.href = secret.API + '/provide/google'
    } catch (error) {
      console.error("Lỗi đăng nhập Google:", error)
    }
  }

  return (
    <>
      <BreadcrumbHero 
        title={'Đăng ký'}
        description={'Chào mừng bạn đến với nơi của những người yêu thích điện ảnh.'}
      />
      <section className="flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="container mx-auto pb-10 mt-2">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-8 border-r-1px border-white">
              <div className="bg-gray-800 p-8 rounded-md">
                <h3 className="text-2xl font-bold" style={{ marginBottom: '20px' }}>Đăng ký</h3>
                {error && <p>{error}</p>}
                <form onSubmit={handleRegister}>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="fullname"
                      placeholder="Tên của bạn..."
                      value={formData.fullname}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="email"
                      name="email"
                      placeholder="Địa chỉ email..."
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      name="username"
                      placeholder="Tên tài khoản..."
                      value={formData.username}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      name="password"
                      placeholder="Mật khẩu..."
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Xác nhận mật khẩu..."
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-500 py-3 rounded-md font-bold hover:bg-red-600 transition"
                  >
                    Đăng ký
                  </button>
                </form>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
              <div className="mt-12">
                <div className="w-full lg:w-full flex flex-col items-center justify-center mb-10">
                  <h3 className="text-2xl font-bold mb-4" style={{ marginBottom: '15px' }}>Đã có tài khoản?</h3>
                  <a
                    href="/login"
                    className="bg-red-500 py-3 px-8 rounded-md font-bold hover:bg-red-600 transition"
                  >
                    Đăng nhập ngay
                  </a>
                </div>
                <span className="block text-center text-gray-400">or</span>
                <div className="flex justify-center flex-col gap-4 mt-4">
                  <div className='flex justify-center mx-auto'>
                    <a className="bg-blue-600 py-3 px-6 rounded-md font-bold hover:bg-blue-700 transition flex justify-center w-[400px]">
                      Đăng nhập với Facebook
                    </a>
                  </div>
                  <div className='flex justify-center mx-auto'>
                    <a 
                      onClick={handleGoogleLogin} 
                      className="bg-red-500 py-3 px-6 rounded-md font-bold hover:bg-red-600 transition flex justify-center w-[400px]"
                    >
                      Đăng nhập với Google
                    </a>
                  </div>
                  <div className='flex justify-center mx-auto'>
                    <a className="bg-blue-400 py-3 px-6 rounded-md font-bold hover:bg-blue-500 transition flex justify-center w-[400px]">
                      Đăng nhập với Twitter
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default Register
