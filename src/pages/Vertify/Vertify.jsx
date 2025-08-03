import React from 'react'
import BreadcrumbHero from '../../components/BreadcrumbHero'
import { useNavigate } from 'react-router-dom'

const Vertify = () => {
  const navigate = useNavigate()
  return (
    <>
      <BreadcrumbHero
        title={'Xác thực'}
        description={
          'Chào mừng bạn đến với nơi của những người yêu thích điện ảnh.'
        }
      />
      <section className="flex flex-col items-center justify-center bg-gray-900 text-white">
        <div className="container mx-auto text-center px-10 py-14">
          <div className="bg-gray-800 p-8 rounded-md max-w-lg mx-auto">
            <h3 className="text-2xl font-bold mb-4">Xác thực tài khoản</h3>
            <p className="text-gray-300 mb-6">
              Chúng tôi đã gửi một email xác nhận đến địa chỉ email của bạn. Vui
              lòng kiểm tra hộp thư (bao gồm cả thư rác) và làm theo hướng dẫn
              để kích hoạt tài khoản.
            </p>
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

export default Vertify
