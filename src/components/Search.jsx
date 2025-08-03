import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import useDebounce from '../hooks/useDebounce'
import HomeService from '../services/homeService'

const Search = () => {
  const [showSearchBar, setShowSearchBar] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const debouncedSearchTerm = useDebounce(searchQuery, 500)
  const navigate = useNavigate()

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchSearchResults(debouncedSearchTerm)
      setIsTyping(false)
    } else {
      setSearchResults([])
      setIsTyping(false)
    }
  }, [debouncedSearchTerm])

  const fetchSearchResults = async (query) => {
    try {
      setIsLoading(true)
      const response = await HomeService.getAllMovieWithSearch(query)
      setSearchResults(response.data.data || [])
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`)
      resetSearch()
    }
  }

  const resetSearch = () => {
    setSearchQuery('')
    setSearchResults([])
    setShowSearchBar(false)
    setIsTyping(false)
  }

  const handleMovieClick = (movie) => {
    navigate(`/detail/${movie.slug || movie.id}`)
    resetSearch()
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    setIsTyping(value.length > 0)
  }

  return (
    <div className="relative">
      {showSearchBar ? (
        <form
          onSubmit={handleSearchSubmit}
          className="flex items-center bg-white rounded-md p-1"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Tìm kiếm phim..."
            className="px-3 py-1 w-40 md:w-64 focus:outline-none text-black"
            autoFocus
          />
          <button
            type="button"
            onClick={resetSearch}
            className="mx-2 text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </form>
      ) : (
        <button
          onClick={() => setShowSearchBar(true)}
          className="p-1 text-white hover:text-gray-300 cursor-pointer"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      )}

      {/* Kết quả tìm kiếm */}
      {showSearchBar && searchResults.length > 0 && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white text-black rounded shadow-lg z-50 max-h-80 overflow-y-auto">
          {searchResults.map((movie) => (
            <div
              key={movie.id}
              className="p-2 hover:bg-gray-100 cursor-pointer border-b border-gray-200 flex items-start"
              onClick={() => handleMovieClick(movie)}
            >
              <div className="flex-shrink-0 mr-3">
                <img
                  src={movie.image || '/default-movie-image.jpg'}
                  alt={movie.title}
                  className="w-12 h-16 object-cover rounded"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = '/default-movie-image.jpg'
                  }}
                />
              </div>
              <div className="flex-grow overflow-hidden">
                <h4
                  className="font-medium truncate text-black text-lg"
                  style={{ color: 'black', fontSize: '18px', height: '24px' }}
                >
                  {movie.title}
                </h4>
                <p
                  className="text-black text-xs my-1"
                  style={{
                    color: 'black',
                    fontSize: '14px',
                    margin: 0,
                    height: '24px'
                  }}
                >
                  Thời lượng: {movie.duration} phút
                </p>
                <div className="flex items-center text-xs">
                  <span className="text-black" style={{ color: 'black' }}>
                    {movie.studio}
                  </span>
                  {movie.score && (
                    <span
                      className="ml-2 text-yellow-500 font-medium"
                      style={{ color: 'black' }}
                    >
                      ★ {movie.score.toFixed(1)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Đang nhập */}
      {showSearchBar && isTyping && searchQuery && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white p-2 text-center text-gray-500 rounded shadow-lg">
          Đang tìm kiếm...
        </div>
      )}

      {/* Đang tải kết quả */}
      {showSearchBar && isLoading && !isTyping && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white p-2 text-center text-gray-500 rounded shadow-lg">
          Đang tải kết quả...
        </div>
      )}

      {/* Không tìm thấy phim */}
      {showSearchBar &&
        !isLoading &&
        !isTyping &&
        searchResults.length === 0 &&
        searchQuery && (
          <div className="absolute top-full left-0 mt-2 w-full bg-white p-2 text-center text-gray-500 rounded shadow-lg">
            Không tìm thấy phim
          </div>
        )}
    </div>
  )
}

export default Search
