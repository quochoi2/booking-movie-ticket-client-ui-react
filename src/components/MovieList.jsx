import { Link } from 'react-router-dom'
import MovieCard from "./MovieCard"

const MovieList = ({ className = '', viewAll = '', sectionClass }) => {
  const movies = [
    { title: 'The Seven Deadly Sins: Wrath of the Gods', img: 'img/trending/trend-1.jpg' },
    { title: 'Gintama Movie 2: Kanketsu-hen - Yorozuya yo Eien', img: 'img/trending/trend-2.jpg' },
    { title: 'Shingeki no Kyojin Season 3 Part 2', img: 'img/trending/trend-3.jpg' },
    { title: 'Fullmetal Alchemist: Brotherhood', img: 'img/trending/trend-4.jpg' },
    { title: 'Shiratorizawa Gakuen Koukou', img: 'img/trending/trend-5.jpg' },
    { title: 'Code Geass: Hangyaku no Lelouch R2', img: 'img/trending/trend-6.jpg' }
  ]

  return (
    <section className={`trending-now py-10 ${sectionClass}`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-bold text-white border-l-4 border-red-500 pl-2 uppercase">Phim đang chiếu</h4>
          <Link to={'/movies'} className={`text-white bg-[#f44336] font-bold py-2 px-5 rounded-md ${viewAll}`}>Xem thêm</Link>
        </div>
        <div className={className}>
          {movies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MovieList
