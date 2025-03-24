import React, { useState } from 'react'

const showtimes = [
  { day: 'Wednesday', date: '05/03', active: true },
  { day: 'Thursday', date: '06/03' },
  { day: 'Friday', date: '07/03' },
  { day: 'Saturday', date: '08/03' },
  { day: 'Sunday', date: '09/03' },
  { day: 'Monday', date: '10/03' },
  { day: 'Tuesday', date: '11/03' }
]

const cinemas = [
  { name: 'All', active: true },
  { name: 'Galaxy MIPEC Long Biên' },
  { name: 'Beta Cineplex Mỹ Đình' },
  { name: 'CGV Vincom Nguyễn Chí Thanh' },
]

const Showtime = () => {
  const [selectedDay, setSelectedDay] = useState(showtimes[0])
  const [selectedCinema, setSelectedCinema] = useState(cinemas[0])

  return (
    <div className=" text-white">
      <div className="flex items-center mb-5">
        <h4 className="text-xl font-bold text-white border-l-4 border-red-500 pl-2 uppercase">Lịch chiếu</h4>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {showtimes.map((st) => (
          <button
            key={st.date}
            onClick={() => setSelectedDay(st)}
            className={`px-4 py-2 rounded ${selectedDay.date === st.date ? 'bg-red-500' : 'bg-gray-300 text-black'}`}
          >
            {st.day} - {st.date}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {cinemas.map((cinema) => (
          <button
            key={cinema.name}
            onClick={() => setSelectedCinema(cinema)}
            className={`px-4 py-2 rounded ${selectedCinema.name === cinema.name ? 'bg-red-500' : 'bg-gray-300 text-black'}`}
          >
            {cinema.name}
          </button>
        ))}
      </div>

      <div className="bg-gray-800 text-black p-5 rounded-lg">
        <div className='relative'>
          <div className='absolute top-0 right-0'>
            <a href="#" className="text-white">[ Bản đồ ]</a>
          </div>          
          <h4 className="font-bold">Galaxy MIPEC Long Biên </h4>
        </div>
        <p>Tầng 6, tòa nhà Mipec Riverside, số 2, phố Long Biên 2, quận Long Biên, Hà Nội</p>
        <div className="bg-gray-200 text-black mt-2 p-2 rounded inline-block">7:30 PM ~ 9:30 PM</div>
      </div>
    </div>
  )
}

export default Showtime
