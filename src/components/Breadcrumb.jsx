import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'

const Breadcrumb = ({ items = ['Danh mục', 'Tình cảm'] }) => {
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
              {items.map((item, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-gray-400">&gt;</span>
                  <span className="text-white hover:underline ml-2">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Breadcrumb