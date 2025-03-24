import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const Header = ({ props }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <header className="bg-[#070720] text-white font-['\Mulish\'] font-medium">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-2xl font-bold">
          <Link to={'/'}>
            <img src="/img/logo.png" alt="logo" width={50} />
          </Link>
        </div>

        <nav className={`lg:flex ${menuOpen ? 'block' : 'hidden'} absolute lg:relative w-full lg:w-auto top-16 left-0 lg:top-auto lg:left-auto`}>
          <ul className="flex flex-col lg:flex-row lg:space-x-8 items-center">
            <li>
              <h5 className="text-white font-bold text-sm">
                <Link to={'/'}>
                  Homepage
                </Link>
              </h5>
            </li>
            <li>
              <h5 className="text-white font-bold text-sm">
                <Link to={'/movie'}>
                  Movies
                </Link>
              </h5>
            </li>
            <li>
              <h5 className="text-white font-bold text-sm">
                <Link to={'/blog'}>
                  Our Blog
                </Link>
              </h5>
            </li>
            <li>
              <h5 className="text-white font-bold text-sm">
                <Link to={'/'}>
                  Contact
                </Link>
              </h5>            
            </li>
          </ul>
        </nav>

        <div className="flex items-center space-x-4 gap-3">
          <a style={{ marginRight: '8px' }} href="/"><FontAwesomeIcon icon={faSearch} /></a>
          <a href="/login"><FontAwesomeIcon icon={faUser} /></a>
          <button className="lg:hidden" onClick={toggleMenu}>
            <FontAwesomeIcon icon={menuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
