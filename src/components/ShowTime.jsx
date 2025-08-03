import React, { useState, useEffect } from 'react'
import SeatModal from '../pages/Detail/SeatModal.jsx'
import { useOrder } from '../contexts/OrderContext.jsx'

const Showtime = ({ showtimes = [] }) => {
  // luu thong tin phim
  const { updateOrderData } = useOrder()

  const getCurrentWeekDays = () => {
    const days = []
    const today = new Date()
    const currentWeekday = today.getDay() // 0 (Sunday) -> 6 (Saturday)
    const diffToMonday = (currentWeekday + 6) % 7
    const monday = new Date(today)
    monday.setDate(today.getDate() - diffToMonday)

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday)
      date.setDate(monday.getDate() + i)

      const dayName = date.toLocaleDateString('vi-VN', { weekday: 'long' })
      const dateString = date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit'
      })

      days.push({
        day: dayName.charAt(0).toUpperCase() + dayName.slice(1),
        date: dateString,
        fullDate: date.toISOString()
      })
    }

    return days
  }

  const getUniqueCinemas = () => {
    const cinemasMap = new Map()

    showtimes.forEach((st) => {
      if (st.Cinema && !cinemasMap.has(st.Cinema.id)) {
        cinemasMap.set(st.Cinema.id, {
          id: st.Cinema.id,
          name: st.Cinema.name,
          address: st.Cinema.address
        })
      }
    })

    return [{ id: 'all', name: 'Tất cả' }, ...Array.from(cinemasMap.values())]
  }

  const allDays = getCurrentWeekDays()
  const allCinemas = getUniqueCinemas()

  const [selectedDay, setSelectedDay] = useState(null)
  const [selectedCinema, setSelectedCinema] = useState(null)

  useEffect(() => {
    if (allDays.length > 0 && !selectedDay) {
      setSelectedDay(allDays[0])
    }
    if (allCinemas.length > 0 && !selectedCinema) {
      setSelectedCinema(allCinemas[0])
    }
  }, [allDays, allCinemas])

  const filteredShowtimes = showtimes.filter((st) => {
    if (!selectedDay || !selectedCinema) return false
    const showtimeDate = new Date(st.timeStart).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit'
    })
    const cinemaMatch =
      selectedCinema.id === 'all' || st.Cinema.id === selectedCinema.id
    const dateMatch = selectedDay.date === showtimeDate
    return cinemaMatch && dateMatch
  })

  const groupByCinema = (list) => {
    const map = new Map()
    list.forEach((st) => {
      const id = st.Cinema.id
      if (!map.has(id)) {
        map.set(id, { cinema: st.Cinema, times: [] })
      }
      map.get(id).times.push(st)
    })
    return Array.from(map.values())
  }

  const formatTime = (timeString) => {
    const time = new Date(timeString)
    return time.toLocaleTimeString('vi-VN', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  // seats
  const [selectedShowtime, setSelectedShowtime] = useState(null)

  const handleSelectShowtime = (st, cinema) => {
    // Tạo đối tượng ngày từ timeStart
    const showtimeDate = new Date(st.timeStart)
    const formattedDate = showtimeDate.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })

    // Tạo đối tượng giờ chiếu
    const formattedTime =
      formatTime(st.timeStart) + ' - ' + formatTime(st.timeEnd)

    // Cập nhật vào context
    updateOrderData({
      cinema: cinema.name,
      cinemaId: cinema.id,
      date: formattedDate,
      showtime: formattedTime,
      showtimeId: st.id
      // Có thể thêm các trường khác nếu cần
    })

    // Mở modal chọn ghế
    setSelectedShowtime({
      cinemaId: cinema.id,
      showtimeId: st.id
    })
  }

  return (
    <div className="text-white">
      <div className="flex items-center mb-5">
        <h4 className="text-xl font-bold text-white border-l-4 border-red-500 pl-2 uppercase">
          Lịch chiếu
        </h4>
      </div>

      {/* Chọn ngày */}
      <div className="flex flex-wrap gap-2 mb-4">
        {allDays.map((day) => (
          <button
            key={day.date}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded cursor-pointer ${
              selectedDay?.date === day.date
                ? 'bg-red-500'
                : 'bg-gray-300 text-black'
            }`}
          >
            {day.day} - {day.date}
          </button>
        ))}
      </div>

      {/* Chọn rạp */}
      <div className="flex flex-wrap gap-2 mb-4">
        {allCinemas.map((cinema) => (
          <button
            key={cinema.id}
            onClick={() => setSelectedCinema(cinema)}
            className={`px-4 py-2 rounded cursor-pointer ${
              selectedCinema?.id === cinema.id
                ? 'bg-red-500'
                : 'bg-gray-300 text-black'
            }`}
          >
            {cinema.name}
          </button>
        ))}
      </div>

      {/* Danh sách lịch chiếu */}
      {filteredShowtimes.length > 0 ? (
        groupByCinema(filteredShowtimes).map(({ cinema, times }) => (
          <div
            key={cinema.id}
            className="bg-gray-800 text-white p-5 rounded-lg mb-4"
          >
            <div className="relative">
              <div className="absolute top-0 right-0">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cinema.name + ' ' + cinema.address || '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white cursor-pointer"
                >
                  [ Bản đồ ]
                </a>
              </div>
              <h4 className="font-bold">{cinema.name}</h4>
            </div>
            <p>{cinema.address}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {times.map((st) => (
                <div
                  onClick={() => handleSelectShowtime(st, cinema)}
                  key={st.id}
                  className="bg-gray-200 text-black p-2 rounded cursor-pointer"
                  style={{ userSelect: 'none' }}
                >
                  {formatTime(st.timeStart)} ~ {formatTime(st.timeEnd)}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="bg-gray-800 text-white p-5 rounded-lg flex justify-center items-center">
          <p style={{ marginTop: '20px' }}>Không có lịch chiếu nào hiện tại</p>
        </div>
      )}

      {selectedShowtime && (
        <SeatModal
          cinemaId={selectedShowtime.cinemaId}
          showtimeId={selectedShowtime.showtimeId}
          onClose={() => setSelectedShowtime(null)}
        />
      )}
    </div>
  )
}

export default Showtime
