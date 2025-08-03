import { requestApiFile, requestApiJson } from '../utils/requestApi'

const ProfileService = {
  updateImage: async (formData) => {
    // Nhận formData làm tham số
    // Lấy id từ localStorage
    const userData = localStorage.getItem('user')
    if (!userData) {
      throw new Error('User data not found in localStorage')
    }

    const { id } = JSON.parse(userData)

    // Thêm id vào formData nhận được từ tham số
    formData.append('id', id)

    return await requestApiFile.put('/user/update-with-image', formData)
  },

  updateProfile: async (formData) => {
    // Nhận formData làm tham số
    const userData = localStorage.getItem('user')
    if (!userData) {
      throw new Error('User data not found in localStorage')
    }

    const { id } = JSON.parse(userData)

    // Thêm id vào formData nhận được từ tham số
    formData.append('id', id)

    return await requestApiFile.put('/user/update-with-image', formData)
    // Đã bỏ dấu phẩy thừa sau formData
  },

  getOrderByUser: async () => {
    return await requestApiJson.get(`/order/by-user`)
  }
}

export default ProfileService
