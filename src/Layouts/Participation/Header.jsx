import { useContext, useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell,
  faUser,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import Search from '../../components/Search'
import AuthService from '../../services/authService'
import Notification from '../../components/Notification'
import useSocketConnection from '../../hooks/useSocketConnection'

const Header = ({ props }) => {
  // useSocketConnection()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [user, setUser] = useState(null) // Thêm state cho user
  const dropdownRef = useRef(null)
  const { isAuthenticated, logout } = useContext(UserContext)
  const navigate = useNavigate()

  // Thêm useEffect để lấy thông tin user từ localStorage khi component mount
  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
  }, [isAuthenticated]) // Chạy lại khi trạng thái isAuthenticated thay đổi

  const toggleMenu = () => setMenuOpen(!menuOpen)

  const handleLogout = () => {
    AuthService.logout()
    logout()
    setUser(null) // Xóa thông tin user khi logout
    navigate('/login')
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-[#070720] text-white font-['\Mulish\'] font-medium">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold w-[240px]">
          <Link to={'/'}>
            <img src="/img/logo.png" alt="logo" width={50} />
          </Link>
        </div>

        <nav
          className={`lg:flex ${menuOpen ? 'block' : 'hidden'} absolute lg:relative w-full lg:w-auto top-16 left-0 lg:top-auto lg:left-auto`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-8 items-center">
            <li>
              <h5 className="text-white font-bold text-sm">
                <Link to={'/'}>Trang chủ</Link>
              </h5>
            </li>
            <li>
              <h5 className="text-white font-bold text-sm">
                <Link to={'/movie'}>Phim</Link>
              </h5>
            </li>
            <li>
              <h5 className="text-white font-bold text-sm">
                <Link to={'/blog'}>Bài viết</Link>
              </h5>
            </li>
            <li>
              <h5 className="text-white font-bold text-sm">
                <Link to={'/'}>Liên hệ</Link>
              </h5>
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-4 gap-3">
          <Search />

          {/* <Notification /> */}

          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2"
              >
                <img
                  src={user?.image || '/img/user-default.jpg'}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover border border-white cursor-pointer"
                />
                <span className="hidden lg:inline text-sm">
                  {user?.fullname || user?.username}
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg z-50">
                  <button
                    onClick={() => {
                      navigate('/profile')
                      setDropdownOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Hồ sơ
                  </button>
                  <button
                    onClick={() => {
                      navigate('/favorite')
                      setDropdownOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Yêu thích
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  >
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <FontAwesomeIcon icon={faUser} />
            </Link>
          )}

          <button className="lg:hidden" onClick={toggleMenu}>
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
