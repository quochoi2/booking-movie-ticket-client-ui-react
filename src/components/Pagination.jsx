import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faForwardStep, // next 1 trang
  faForwardFast, // đến trang cuối
  faBackwardFast, // đến trang đầu
  faBackwardStep // previous 1 trang
} from '@fortawesome/free-solid-svg-icons'

const Pagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  // Tạo mảng các trang để hiển thị (chỉ hiển thị một số trang gần currentPage)
  const getVisiblePages = () => {
    const visiblePages = []
    const maxVisible = 5 // Số trang tối đa hiển thị

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2))
    let end = Math.min(totalPages, start + maxVisible - 1)

    // Điều chỉnh nếu ở đầu hoặc cuối
    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i)
    }

    return visiblePages
  }

  return (
    <div className="flex justify-center items-center gap-2 mb-10 mt-5">
      {/* Nút đến trang đầu tiên */}
      <button
        className={`w-[45px] h-[45px] flex items-center justify-center rounded-full border ${
          currentPage > 1
            ? 'border-white text-white hover:bg-gray-700 cursor-pointer'
            : 'border-gray-500 text-gray-500 cursor-not-allowed'
        }`}
        onClick={() => handlePageChange(1)}
        disabled={currentPage <= 1}
        title="Đến trang đầu"
      >
        <FontAwesomeIcon icon={faBackwardFast} />
      </button>

      {/* Nút previous 1 trang */}
      <button
        className={`w-[45px] h-[45px] flex items-center justify-center rounded-full border ${
          currentPage > 1
            ? 'border-white text-white hover:bg-gray-700 cursor-pointer'
            : 'border-gray-500 text-gray-500 cursor-not-allowed'
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        title="Trang trước"
      >
        <FontAwesomeIcon icon={faBackwardStep} />
      </button>

      {/* Hiển thị trang đầu tiên nếu không nằm trong visiblePages */}
      {getVisiblePages()[0] > 1 && (
        <>
          <button
            className={`w-[45px] h-[45px] flex items-center justify-center rounded-full border cursor-pointer ${
              1 === currentPage
                ? 'border-white text-white bg-gray-700 cursor-pointer'
                : 'border-gray-400 text-gray-400 hover:bg-gray-700'
            }`}
            onClick={() => handlePageChange(1)}
          >
            1
          </button>
          {getVisiblePages()[0] > 2 && (
            <span className="text-gray-400 px-2">...</span>
          )}
        </>
      )}

      {/* Các trang chính */}
      {getVisiblePages().map((page) => (
        <button
          key={page}
          className={`w-[45px] h-[45px] flex items-center justify-center rounded-full border cursor-pointer ${
            page === currentPage
              ? 'border-white text-white bg-gray-700 cursor-pointer'
              : 'border-gray-400 text-gray-400 hover:bg-gray-700'
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}

      {/* Hiển thị trang cuối nếu không nằm trong visiblePages */}
      {getVisiblePages()[getVisiblePages().length - 1] < totalPages && (
        <>
          {getVisiblePages()[getVisiblePages().length - 1] < totalPages - 1 && (
            <span className="text-gray-400 px-2">...</span>
          )}
          <button
            className={`w-[45px] h-[45px] flex items-center justify-center rounded-full border ${
              totalPages === currentPage
                ? 'border-white text-white bg-gray-700 cursor-pointer'
                : 'border-gray-400 text-gray-400 hover:bg-gray-700'
            }`}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Nút next 1 trang */}
      <button
        className={`w-[45px] h-[45px] flex items-center justify-center rounded-full border ${
          currentPage < totalPages
            ? 'border-white text-white hover:bg-gray-700 cursor-pointer'
            : 'border-gray-500 text-gray-500 cursor-not-allowed'
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= totalPages}
        title="Trang sau"
      >
        <FontAwesomeIcon icon={faForwardStep} />
      </button>

      {/* Nút đến trang cuối cùng */}
      <button
        className={`w-[45px] h-[45px] flex items-center justify-center rounded-full border ${
          currentPage < totalPages
            ? 'border-white text-white hover:bg-gray-700 cursor-pointer'
            : 'border-gray-500 text-gray-500 cursor-not-allowed'
        }`}
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage >= totalPages}
        title="Đến trang cuối"
      >
        <FontAwesomeIcon icon={faForwardFast} />
      </button>
    </div>
  )
}

export default Pagination
