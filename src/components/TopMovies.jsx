import ViewCard from "./ViewCard";

const movies = [
  { title: "Boruto: Naruto next generations", image: "/img/sidebar/tv-1.jpg" },
  { title: "The Seven Deadly Sins: Wrath of the Gods", image: "/img/sidebar/tv-2.jpg" },
  { title: "Sword art online alicization war of underworld", image: "/img/sidebar/tv-3.jpg" },
  { title: "Fate/stay night: Heaven's Feel I. presage flower", image: "/img/sidebar/tv-4.jpg" },
]

const TopMovies = ({ className = '' }) => {
  return (
    <section className="top-movies py-10 min-w-[360px]">
      <div className="container mx-auto max-w-screen-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center mr-[30px]">
            <h4 className="text-xl font-bold text-white border-l-4 border-red-500 pl-2 uppercase">Phim hot</h4>
          </div>
          <ul className="flex space-x-4 text-white text-sm">
            <li className="text-[#d33b3b]">Ngày</li>
            <li className="text-[#b7b7b7]">Tuần</li>
            <li className="text-[#b7b7b7]">Tháng</li>
            <li className="text-[#b7b7b7]">Năm</li>
          </ul>
        </div>
        <div className={`${className}`}>
          {movies.map((movie, index) => (
            <ViewCard 
              key={index}
              title={movie.title}
              image={movie.image}
              episodes="Hot"
              views="9141"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TopMovies
