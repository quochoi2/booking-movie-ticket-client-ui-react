import BlogList from "../../components/BlogList"
import Hero from "../../components/Hero"
import MovieList from "../../components/MovieList"
import TopMovies from "../../components/TopMovies"


const Home = () => {
  return (  
    <div className="flex justify-center mx-5">
      <div>
        <Hero />
        <TopMovies className={"grid grid-cols-1 md:grid-cols-4 gap-4"} />
        <MovieList className={'grid grid-cols-1 md:grid-cols-4 gap-5'} />
        <BlogList />
      </div>
    </div>

  )
}
 
export default Home