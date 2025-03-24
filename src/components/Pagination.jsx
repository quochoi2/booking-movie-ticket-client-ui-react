import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward, faBackward } from '@fortawesome/free-solid-svg-icons'

const Pagination = ({ totalPages = 10 }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="flex justify-center items-center gap-4 mb-10">
      {currentPage > 1 && (
        <button
          className="w-[45px] h-[45px] flex items-center justify-center rounded-full border border-white text-white"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <FontAwesomeIcon icon={faBackward} />
        </button>
      )}
      {[...Array(totalPages).keys()].map((n) => (
        <button
          key={n + 1}
          className={`w-[45px] h-[45px] flex items-center justify-center rounded-full border select-none ${
            currentPage === n + 1 ? 'border-white text-white' : 'text-gray-400'
          }`}
          onClick={() => handlePageChange(n + 1)}
        >
          {n + 1}
        </button>
      ))}
      {currentPage < totalPages && (
        <button
          className="w-[45px] h-[45px] flex items-center justify-center rounded-full border border-white text-white"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <FontAwesomeIcon icon={faForward} />
        </button>
      )}
    </div>
  )
}

export default Pagination
