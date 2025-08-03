import { requestApiPublic } from '../utils/requestApi'

const DetailService = {
  // get all movie
  getMovieById: async (movieId) => {
    return await requestApiPublic.get(`/movie/public/${movieId}`)
  },

  // get seats by cinemaId
  getSeatbyCinemaId: async (cinemaId, showtimeId) => {
    return await requestApiPublic.get(
      `/seat/public/by-cinema/${cinemaId}?showtimeId=${showtimeId}`
    )
  },

  // get foods
  getFoods: async () => {
    return await requestApiPublic.get(`/food/public/search`)
  },

  // check payment
  checkPayment: async (data) => {
    return await requestApiPublic.post(`/qrcode/check-payment`, data)
  }
}

export default DetailService
