import { requestApiPublic } from "../utils/requestApi"

const MovieService = {
  // get all movie
  getAllMovies: async () => {
    return await requestApiPublic.get(`/movie/public/search?page=${1}&pageSize=${8}`)
  }
}

export default MovieService