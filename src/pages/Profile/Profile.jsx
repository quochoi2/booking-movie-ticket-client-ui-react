import Breadcrumb from '../../components/Breadcrumb'
import { useEffect, useState, useRef } from 'react'
import ProfileService from '../../services/profileService'
import OrderModal from './OrderModal'

const Profile = () => {
  const [user, setUser] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef(null)

  const [orders, setOrders] = useState([])
  const [orderCount, setOrderCount] = useState(0)
  const [showOrdersModal, setShowOrdersModal] = useState(false)
  const [isLoadingOrders, setIsLoadingOrders] = useState(false)

  // orders
  const fetchOrderCount = async () => {
    try {
      const response = await ProfileService.getOrderByUser()
      console.log(response.data)
      if (response.data) {
        setOrderCount(response.data.data.length)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    }
  }

  const fetchAllOrders = async () => {
    setIsLoadingOrders(true)
    try {
      const response = await ProfileService.getOrderByUser()
      if (response.data && response.data.code === 0) {
        setOrders(response.data.data)
        setShowOrdersModal(true)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setIsLoadingOrders(false)
    }
  }

  // Profile
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
      fetchOrderCount()
    }
  }, [])

  const handleImageClick = () => {
    fileInputRef.current.click()
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Kiểm tra loại file và kích thước (giữ nguyên)

    try {
      setIsUploading(true)

      const formData = new FormData()
      formData.append('image', file)

      // Gọi API upload ảnh
      const response = await ProfileService.updateImage(formData)

      // Kiểm tra response và lấy URL ảnh mới
      if (response.data && response.data.data && response.data.data.image) {
        const newImageUrl = response.data.data.image

        // 1. Cập nhật state ngay lập tức để hiển thị ảnh mới
        setUser((prevUser) => ({
          ...prevUser,
          image: newImageUrl
        }))

        // 2. Cập nhật localStorage
        const updatedUser = {
          ...JSON.parse(localStorage.getItem('user')),
          image: newImageUrl
        }
        localStorage.setItem('user', JSON.stringify(updatedUser))

        alert('Cập nhật ảnh đại diện thành công!')
      } else {
        throw new Error('Không nhận được URL ảnh từ server')
      }
    } catch (error) {
      console.error('Lỗi khi upload ảnh:', error)
      alert(error.message || 'Có lỗi xảy ra khi upload ảnh')
    } finally {
      setIsUploading(false)
      e.target.value = null
    }
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading user data...</p>
      </div>
    )
  }

  return (
    <div className="flex justify-center mx-5 py-8">
      <div className="w-full max-w-4xl">
        <Breadcrumb items={['Hồ sơ', 'Thông tin cá nhân']} />

        <section className="bg-white rounded-lg shadow-md overflow-hidden mt-6">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32 relative">
            {/* Avatar có thể click để upload */}
            <div className="absolute -bottom-16 left-8">
              <div
                className="relative cursor-pointer"
                onClick={handleImageClick}
              >
                <img
                  key={user.image} // Thêm dòng này
                  src={user.image}
                  alt={user.fullname}
                  className={`w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg ${isUploading ? 'opacity-70' : ''}`}
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = 'https://via.placeholder.com/150'
                  }}
                />
                {isUploading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white text-sm">Đang tải lên...</span>
                  </div>
                )}
              </div>
              {/* Input file ẩn */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>

          {/* Phần còn lại giữ nguyên */}
          <div className="pt-20 px-8 pb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  {user.fullname || user.fullName || user.username}
                </h1>
                <p className="text-gray-600 mt-1">@{user.username}</p>
              </div>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition duration-200"
                disabled={isUploading}
              >
                {isUploading ? 'Đang xử lý...' : 'Chỉnh sửa hồ sơ'}
              </button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Thông tin cá nhân */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2
                  className="text-xl font-semibold text-gray-800"
                  style={{ marginBottom: '12px' }}
                >
                  Thông tin cá nhân
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500" style={{ margin: 0 }}>
                      Email:
                      <span className="ml-2 text-black">{user.email}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500" style={{ margin: 0 }}>
                      Họ và tên:
                      <span className="ml-2 text-black">{user.fullname}</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Thống kê hoạt động */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Hoạt động
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md shadow-sm text-center">
                    <p className="text-gray-500 text-sm">Đơn hàng</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {orderCount}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm text-center">
                    <p className="text-gray-500 text-sm">Đánh giá</p>
                    <p className="text-2xl font-bold text-yellow-500">8</p>
                  </div>
                </div>
                <button
                  onClick={fetchAllOrders}
                  disabled={isLoadingOrders}
                  className="mt-4 w-full bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-md transition duration-200"
                >
                  {isLoadingOrders ? 'Đang tải...' : 'Xem tất cả đơn hàng'}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Modal hiển thị đơn hàng */}
        {showOrdersModal && (
          <OrderModal
            orders={orders}
            onClose={() => setShowOrdersModal(false)}
          />
        )}
      </div>
    </div>
  )
}

export default Profile
