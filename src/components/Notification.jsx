import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBell, FaTimes } from 'react-icons/fa'
import useSocketConnection from '../hooks/useSocketConnection'

const Notification = () => {
  useSocketConnection()
  const [isOpen, setIsOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    // Dữ liệu mẫu - có thể xóa khi kết nối với backend
    {
      id: '12345',
      orderId: 'ORD-12345',
      movie: 'Avengers: Endgame',
      timestamp: new Date().toISOString()
    }
  ])
  const [unreadCount, setUnreadCount] = useState(1) // Số thông báo chưa đọc

  const toggleNotifications = () => {
    setIsOpen(!isOpen)
    if (unreadCount > 0) {
      setUnreadCount(0) // Reset số thông báo chưa đọc khi mở
    }
  }

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  const clearAll = () => {
    setNotifications([])
    setUnreadCount(0)
  }

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="p-2 relative hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        aria-label="Thông báo"
      >
        <FaBell className="text-xl text-gray-700" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-50 border border-gray-200"
          >
            <div className="p-3 border-b flex justify-end">
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                  Xóa tất cả
                </button>
              )}
            </div>

            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-500">
                Không có thông báo mới
              </div>
            ) : (
              <ul className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <motion.li
                    key={notification.id}
                    className="p-3 border-b hover:bg-gray-50"
                  >
                    <div className="flex justify-between items-start relative">
                      <div>
                        <p
                          style={{ color: 'black', marginBottom: 0 }}
                          className="font-medium"
                        >
                          Đơn hàng: {notification.orderId}
                        </p>
                        <p
                          style={{ color: 'black', marginBottom: '12px' }}
                          className="text-sm mt-1"
                        >
                          Phim: {notification.movie}
                        </p>
                      </div>
                      <div className="absolute right-0">
                        <button
                          onClick={() => removeNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                          <FaTimes size={12} />
                        </button>
                      </div>
                    </div>
                  </motion.li>
                ))}
              </ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default Notification
