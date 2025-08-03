import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className="text-white py-10 bg-[#070720]">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-8 gap-6 text-center md:text-left items-center">
          <div className="col-span-2">
            <Link>
              <img src="/img/logo.png" alt="logo" width={50} />
            </Link>
          </div>
          <nav className="col-span-4 mr-10">
            <ul className="flex justify-center md:justify-between space-x-6">
              <li>
                <Link to={'/'}>Trang chủ</Link>
              </li>
              <li>
                <Link to={'/movie'}>Danh sách phim</Link>
              </li>
              <li>
                <Link to={'/blog'}>Bài viết</Link>
              </li>
              <li>
                <Link to={'/'}>Liên hệ</Link>
              </li>
            </ul>
          </nav>
          <div className="col-span-2">
            <p className="text-gray-400" style={{ margin: 0 }}>
              Hoàn thành vào &copy; {new Date().getFullYear()} | Lấy cảm hứng
              giao diện từ
              <i className="fas fa-heart text-red-500 mx-1"></i> by
              <a
                href="https://colorlib.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline ml-1"
              >
                Colorlib
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
