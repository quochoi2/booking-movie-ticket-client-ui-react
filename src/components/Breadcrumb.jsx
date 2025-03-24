import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

const Breadcrumb = ({ title }) => {
  return (
    <div className="breadcrumb-option">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="flex items-center space-x-2 text-white">
              <div className='flex items-center w-[100px]'>
                <Link to="/" className="flex items-center text-red-500 hover:underline leading-[1px]">
                  <FontAwesomeIcon icon={faHome} className='mr-2'/> Trang chủ
                </Link>
              </div>
              <span className="text-gray-400">&gt;</span>
              <Link to="/categories" className="text-white hover:underline mr-2">Danh mục</Link>
              <span className="text-gray-400 ml-2">&gt;</span>
              <span className="text-gray-500">Tình cảm</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb
