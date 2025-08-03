import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import ViewCard from './ViewCard'
import StatisticService from '../services/statisticService'
import Loading from './Loading'

const TopMovies = ({ className = '' }) => {
  const [activeTab, setActiveTab] = useState('year')

  // ✅ 1. Sử dụng useQuery để fetch data
  const {
    data: topMovies,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['top-movies', activeTab], // Cache key phụ thuộc vào activeTab
    queryFn: () => StatisticService.topMovieByWeekMonthYear(),
    select: (response) => {
      // ✅ 2. Transform data trực tiếp trong query
      const sourceData =
        activeTab === 'week'
          ? response.data.weekly.data
          : activeTab === 'month'
            ? response.data.monthly.data
            : response.data.yearly.data

      return sourceData.slice(0, 5).map((movie) => ({
        id: movie.movieId,
        title: movie.title,
        image: movie.image,
        episodes: `${movie.totalTickets} vé`
      }))
    },
    staleTime: 5 * 60 * 1000 // Data không bị coi là cũ trong 5 phút
  })

  // ✅ 3. Render UI với các trạng thái tự động từ React Query
  return (
    <section className="top-movies py-10 min-w-[360px]">
      <div className="container mx-auto max-w-screen-lg">
        {/* Phần header giữ nguyên */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center mr-[30px]">
            <h4 className="text-xl font-bold text-white border-l-4 border-red-500 pl-2 uppercase">
              Phim hot
            </h4>
          </div>
          <ul className="flex space-x-4 text-white text-sm">
            {['week', 'month', 'year'].map((tab) => (
              <li
                key={tab}
                style={{ userSelect: 'none' }}
                className={`cursor-pointer ${
                  activeTab === tab
                    ? 'text-[#d33b3b]'
                    : 'text-[#b7b7b7] hover:text-white'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'week' ? 'Tuần' : tab === 'month' ? 'Tháng' : 'Năm'}
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ Xử lý các trạng thái loading/error/data */}
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-white">Đang tải dữ liệu...</p>
          </div>
        ) : isError ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-white">Lỗi khi tải dữ liệu</p>
          </div>
        ) : topMovies?.length > 0 ? (
          <div className={`${className}`}>
            {topMovies.map((movie) => (
              <ViewCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                image={movie.image}
                episodes={movie.episodes}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-40">
            <p className="text-white">Không có dữ liệu phim hot</p>
          </div>
        )}
      </div>
    </section>
  )
}

export default TopMovies
