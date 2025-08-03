import Breadcrumb from '../../components/Breadcrumb'
import MovieList from '../../components/MovieList'
import TopMovies from '../../components/TopMovies'

const Movie = () => {
  return (
    <div className="flex justify-center mx-10 sm:mx-5">
      <div>
        <Breadcrumb />
        <div className="flex gap-[30px] max-w-[1170px]">
          <div className="py-10">
            <MovieList
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
              viewAll="hidden"
              sectionClass="max-w-[770px]"
              showPagination={true}
              itemsPerPage={6}
            />
          </div>
          <TopMovies />
        </div>
      </div>
    </div>
  )
}

export default Movie
