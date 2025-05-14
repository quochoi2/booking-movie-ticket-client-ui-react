import { requestApiPublic } from "../utils/requestApi"

const HomeService = {
  // search movie
  getAllMovieWithSearch: async (search = '') => {
    return await requestApiPublic.get(`/movie/public/search?search=${search}&page=${1}&pageSize=${10}`)
  },

  // get all movie
  getAllMovies: async (page = 1, pageSize = 8) => {
    return await requestApiPublic.get(`/movie/public/search?page=${page}&pageSize=${pageSize}`)
  }
}

export default HomeService