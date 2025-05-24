import { requestApiJson } from "../utils/requestApi"

const PreviewService = {
  getAllPreviewByMovie: async (movieId) => {
    return await requestApiJson.get(`/preview/${movieId}`)
  },

  createPreview: async (data) => {
    return await requestApiJson.post(`/preview`, data)
  },

  deletePreview: async (previewId) => {
    return await requestApiJson.delete(`/preview/${previewId}`)
  }
}

export default PreviewService