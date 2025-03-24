import Breadcrumb from "../../components/Breadcrumb"
import MovieList from "../../components/MovieList"
import Pagination from '../../components/Pagination'

const Favorite = () => {
  return (  
    <div className="flex justify-center mx-10 sm:mx-5">
      <div>
        <Breadcrumb />
        <div className="max-w-[1170px]">
            <MovieList 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              viewAll='hidden'
            />
            <Pagination />
        </div>
      </div>
    </div>
  )
}
 
export default Favorite