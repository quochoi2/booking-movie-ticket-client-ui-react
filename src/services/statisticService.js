// services/statisticService.js
import { requestApiPublic } from "../utils/requestApi";

// Biến lưu cache trong memory
let cachedData = null;
let lastFetchTime = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 phút

const StatisticService = {
  topMovieByWeekMonthYear: async () => {
    // Kiểm tra cache còn hiệu lực
    if (cachedData && Date.now() - lastFetchTime < CACHE_DURATION) {
      return cachedData;
    }

    try {
      const response = await requestApiPublic.get(`/statistic/public/statistic-movie-by-week-month-year`);
      cachedData = response;
      lastFetchTime = Date.now();
      return response;
    } catch (error) {
      // Fallback: trả về cache cũ nếu có, ngay cả khi đã hết hạn
      if (cachedData) return cachedData;
      throw error;
    }
  },

  // Xóa cache khi cần (ví dụ khi user logout)
  clearCache: () => {
    cachedData = null;
    lastFetchTime = 0;
  }
};

export default StatisticService;