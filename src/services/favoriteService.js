import { requestApiJson } from "../utils/requestApi"

const FavoriteService = {
  // search movie
  getAllMovieByUser: async (page = 1, limit = 5) => {
    return await requestApiJson.get(`/favorite/get-all-movies-by-user?page=${page}&limit=${limit}`)
  },

  // get all movie
  addFavorite: async (data) => {
    return await requestApiJson.post(`/favorite`, data)
  },

  // delete favorite
  deleteFavorite: async (movieId) => {
    return await requestApiJson.delete(`/favorite/${movieId}`)
  },

  // check favorite 
  checkFavorite: async (movieId) => {
    return await requestApiJson.get(`/favorite/check-favorite?movieId=${movieId}`)
  }
}

export default FavoriteService