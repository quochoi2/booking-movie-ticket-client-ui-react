import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BreadcrumbHero from '../../components/BreadcrumbHero'
import AuthService from '../../services/authService'
import { UserContext } from '../../contexts/UserContext'
import secret from '../../secret'

const Login = () => {
  const { login, user } = useContext(UserContext)
  const navigate = useNavigate()

  const [username, setUsername] = useState('nguyend')
  const [password, setPassword] = useState('222222')
  const [error, setError] = useState('')

  const handleLocalLogin = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const userData = await AuthService.loginWithLocal(username, password)
      // console.log(userData);
      login(userData)
      navigate('/')
      alert('Đăng nhập thành công')
    } catch (error) {
      setError('Đăng nhập thất bại, vui lòng kiểm tra lại!')
      console.error('Lỗi đăng nhập:', error)
    }
  }

  const handleGoogleLogin = async () => {
    try {
      window.location.href = secret.API + '/provide/google'
    } catch (error) {
      console.error('Lỗi đăng nhập Google:', error)
    }
  }

  return (
    <>
      <BreadcrumbHero
        title={'Đăng nhập'}
        description={
          'Chào mừng bạn đến với nơi của những người yêu thích điện ảnh.'
        }
      />
      <section className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="container mx-auto pb-10 mt-2">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-1/2 p-8 border-r-1px border-white">
              <div className="bg-gray-800 p-8 rounded-md">
                <h3
                  className="text-2xl font-bold"
                  style={{ marginBottom: '15px' }}
                >
                  Đăng nhập
                </h3>
                {error && <p>{error}</p>}
                <form onSubmit={handleLocalLogin}>
                  <div className="mb-4">
                    <input
                      type="text"
                      placeholder="Tên tài khoản..."
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="password"
                      placeholder="Mật khẩu..."
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-red-500 py-3 rounded-md font-bold hover:bg-red-600 transition"
                  >
                    Đăng nhập
                  </button>
                </form>
                <a
                  style={{ marginTop: '15px' }}
                  className="text-sm text-gray-400 hover:text-white mt-4 block text-center"
                >
                  Quên mật khẩu?
                </a>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center">
              <h3
                className="text-2xl font-bold mb-4"
                style={{ marginBottom: '15px' }}
              >
                Không có tài khoản?
              </h3>
              <a
                href="/register"
                className="bg-red-500 py-3 px-8 rounded-md font-bold hover:bg-red-600 transition"
              >
                Đăng ký ngay
              </a>
            </div>
          </div>
          <div className="mt-12">
            <span className="block text-center text-gray-400">or</span>
            <div className="flex justify-center flex-col gap-4 mt-4">
              <div className="flex justify-center mx-auto">
                <a
                  href="#"
                  className="bg-blue-600 py-3 px-6 rounded-md font-bold hover:bg-blue-700 transition flex justify-center w-[400px]"
                >
                  Đăng nhập với Facebook
                </a>
              </div>
              <div className="flex justify-center mx-auto">
                <a
                  onClick={handleGoogleLogin}
                  className="bg-red-500 py-3 px-6 rounded-md font-bold hover:bg-red-600 transition flex justify-center w-[400px]"
                >
                  Đăng nhập với Google
                </a>
              </div>
              <div className="flex justify-center mx-auto">
                <a
                  href="#"
                  className="bg-blue-400 py-3 px-6 rounded-md font-bold hover:bg-blue-500 transition flex justify-center w-[400px]"
                >
                  Đăng nhập với Twitter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login
