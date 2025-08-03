import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { io } from 'socket.io-client'
import { FaBell, FaTimes } from 'react-icons/fa'
import secret from '../secret'

const Notification = () => {
  const [notifications, setNotifications] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  // socket
  useEffect(() => {
    const socket = io(secret.SOCKET, {
      auth: { token: localStorage.getItem('token') },
      reconnection: true,
      transports: ['websocket']
    })

    // Debug connection
    socket.on('connect', () => {
      console.log('✅ Connected with ID:', socket.id)
    })

    socket.on('disconnect', () => {
      console.log('❌ Disconnected')
    })

    const user = JSON.parse(localStorage.getItem('user'))
    if (user?.id) {
      const roomName = `user_${user.id}`
      console.log('Joining room:', roomName)
      socket.emit('join-room', roomName)

      // Xác nhận từ server
      socket.on('room-joined', (room) => {
        console.log('🗂️ Joined room:', room)
      })
    }

    socket.on('payment_success', (data) => {
      console.log('📩 Received data:', data)
      setNotifications((prev) => [data, ...prev])
    })

    return () => socket.disconnect()
  }, [])

  const toggleNotifications = () => {
    setIsOpen(!isOpen)
    if (unreadCount > 0) {
      setUnreadCount(0) // Reset số thông báo chưa đọc khi mở
    }
  }

  const removeNotification = (id, e) => {
    e.stopPropagation()
    setNotifications((prev) => prev.filter((n) => n.orderId !== id))
  }

  return (
    <div className="relative">
      <button
        onClick={toggleNotifications}
        className="p-2 relative hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
        aria-label="Thông báo"
      >
        <FaBell className="text-xl text-gray-700" />

        {/* Hiển thị số lượng thông báo chưa đọc */}
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
            className="absolute -right-20 mt-2 w-60 bg-white rounded-md shadow-lg z-50 border border-gray-200"
          >
            <div className="p-3 border-b flex justify-between items-center">
              <h3 className="font-semibold">Thông báo</h3>
              {notifications.length > 0 && (
                <button
                  onClick={() => setNotifications([])}
                  className="text-xs text-blue-500 hover:text-blue-700"
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
                    key={notification.orderId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-3 border-b hover:bg-gray-50 ${
                      notifications.indexOf(notification) < unreadCount
                        ? 'bg-blue-50'
                        : ''
                    }`}
                  >
                    <div className="flex justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-green-600">
                          {notification.message}
                        </p>
                        <p className="text-sm mt-1">
                          <span className="font-semibold">
                            {notification.data.movie}
                          </span>
                          <span className="mx-2">•</span>
                          {notification.data.showtime}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Ghế: {notification.data.seats}
                        </p>
                      </div>
                      <div className="flex flex-col items-end">
                        <button
                          onClick={(e) =>
                            removeNotification(notification.orderId, e)
                          }
                          className="text-gray-400 hover:text-gray-600 mb-1"
                        >
                          <FaTimes size={12} />
                        </button>
                        <span className="text-xs text-gray-400">
                          {new Date(notification.timestamp).toLocaleTimeString(
                            [],
                            {
                              hour: '2-digit',
                              minute: '2-digit'
                            }
                          )}
                        </span>
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
