import { useState } from 'react'
import { Link } from 'react-router-dom'

const MovieCard = ({ movie }) => {
  const [showModal, setShowModal] = useState(false)

  // Hàm trích xuất ID video YouTube từ URL
  const getYouTubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
    const match = url.match(regExp)
    return match && match[2].length === 11 ? match[2] : null
  }

  const youtubeId = movie.video ? getYouTubeId(movie.video) : null

  return (
    <>
      {/* Movie Card */}
      <div className="bg-gray-800 rounded-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <img
            src={movie.image}
            alt={movie.title}
            className="w-full h-[350px] object-cover"
          />
          {youtubeId && (
            <button
              onClick={() => setShowModal(true)}
              className="cursor-pointer absolute inset-0 flex items-center justify-center w-full h-full bg-opacity-50 transition-opacity duration-300 opacity-0 hover:opacity-100"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.75)'
              }}
            >
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="w-8 h-8 ml-1"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </button>
          )}
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
            Hot
          </div>
          {/* <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md">💬 11</div> */}
          {/* <div zclassName="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md">👁️ 9141</div> */}
        </div>
        <div className="p-4">
          <ul className="flex flex-wrap space-x-2 text-xs text-gray-400 my-2">
            {['Active', 'Action', 'Comedy', 'Cartoon'].map((obj, index) => (
              <li key={index} className="py-2 mr-2">
                {obj}
              </li>
            ))}
          </ul>
          <Link
            to={`/detail/${movie.id}`}
            className="hover:text-red-400 transition-colors duration-300 group relative"
          >
            <h5
              className="text-white font-bold text-sm line-clamp-2 overflow-hidden text-ellipsis"
              title={movie.title}
            >
              {movie.title}
            </h5>
          </Link>
        </div>
      </div>

      {/* Modal Trailer */}
      {showModal && youtubeId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.75)'
          }}
        >
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setShowModal(false)}
              className="absolute -top-10 right-0 text-white hover:text-red-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title={movie.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-[70vh]"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MovieCard
