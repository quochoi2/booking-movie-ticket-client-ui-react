import { useState, useEffect } from 'react'
import BreadcrumbHero from '../../components/BreadcrumbHero'
import { useNavigate } from "react-router-dom"

const Success = () => {
  const navigate = useNavigate()
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1)
    }, 1000)

    const redirectTimer = setTimeout(() => {
      navigate('/login');
    }, 5000)

    return () => {
        clearInterval(timer);
        clearTimeout(redirectTimer);
      }
    }, [navigate])

  return (
    <>
      <BreadcrumbHero 
        title={'Xác thực'}
        description={'Chào mừng bạn đến với nơi của những người yêu thích điện ảnh.'}
      />
      <section className="flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="container mx-auto text-center px-10 py-14">
          <div className="bg-gray-800 p-8 rounded-md max-w-lg mx-auto">
            <h3 className="text-2xl font-bold mb-4">Đăng ký tài khoản thành công</h3>
            <p className="text-gray-300 mb-6">
              Tài khoản của bạn đã được kích hoạt và bạn có thể bắt đầu sử dụng tài khoản này. Giao diện sẽ chuyển về trang đang nhập tron vòng 5 giây nữa, bạn có thể quay lại trang đăng nhập bằng cách bấm vào nút phía bên dưới.
            </p>
            <p className="text-gray-300 mb-6">Tự động chuyển hướng sau {countdown} giây...</p>
            <button
              onClick={() => navigate('/login')} 
              className="bg-red-500 py-3 px-6 rounded-md font-bold hover:bg-red-600 transition"
            >
              Quay trở lại trang đăng nhập
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default Success
