import { useEffect, useState } from "react";
import ViewCard from "./ViewCard";
import StatisticService from "../services/statisticService";

// const movies = [
//   { title: "Boruto: Naruto next generations", image: "/img/sidebar/tv-1.jpg" },
//   { title: "The Seven Deadly Sins: Wrath of the Gods", image: "/img/sidebar/tv-2.jpg" },
//   { title: "Sword art online alicization war of underworld", image: "/img/sidebar/tv-3.jpg" },
//   { title: "Fate/stay night: Heaven's Feel I. presage flower", image: "/img/sidebar/tv-4.jpg" },
// ]

const TopMovies = ({ className = "" }) => {
  const [activeTab, setActiveTab] = useState("year");
  const [topMovies, setTopMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        setLoading(true);

        // Gọi API (tự động sử dụng cache nếu có)
        const response = await StatisticService.topMovieByWeekMonthYear();
        const data = response.data;

        // Xử lý dữ liệu như cũ
        let movies = [];
        if (activeTab === "week") movies = data.weekly.data;
        else if (activeTab === "month") movies = data.monthly.data;
        else if (activeTab === "year") movies = data.yearly.data;

        const formattedMovies = movies.slice(0, 5).map((movie) => ({
          id: movie.movieId,
          title: movie.title,
          image: movie.image,
          episodes: `${movie.totalTickets} vé`,
          // views: `${(movie.totalRevenue / 1000).toFixed(0)}k`,
        }));

        setTopMovies(formattedMovies);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu phim hot:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTopMovies();
  }, [activeTab]);

  return (
    <section className="top-movies py-10 min-w-[360px]">
      <div className="container mx-auto max-w-screen-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center mr-[30px]">
            <h4 className="text-xl font-bold text-white border-l-4 border-red-500 pl-2 uppercase">
              Phim hot
            </h4>
          </div>
          <ul className="flex space-x-4 text-white text-sm">
            <li
              style={{ userSelect: "none" }}
              className={`cursor-pointer ${
                activeTab === "week"
                  ? "text-[#d33b3b]"
                  : "text-[#b7b7b7] hover:text-white"
              }`}
              onClick={() => setActiveTab("week")}
            >
              Tuần
            </li>
            <li
              style={{ userSelect: "none" }}
              className={`cursor-pointer ${
                activeTab === "month"
                  ? "text-[#d33b3b]"
                  : "text-[#b7b7b7] hover:text-white"
              }`}
              onClick={() => setActiveTab("month")}
            >
              Tháng
            </li>
            <li
              style={{ userSelect: "none" }}
              className={`cursor-pointer ${
                activeTab === "year"
                  ? "text-[#d33b3b]"
                  : "text-[#b7b7b7] hover:text-white"
              }`}
              onClick={() => setActiveTab("year")}
            >
              Năm
            </li>
          </ul>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-white">Đang tải dữ liệu...</p>
          </div>
        ) : topMovies.length > 0 ? (
          <div className={`${className}`}>
            {topMovies.map((movie, index) => (
              <ViewCard
                key={movie.id || index}
                id={movie.id}
                title={movie.title}
                image={movie.image}
                episodes={movie.episodes}
                // views={movie.views}
              />
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-40">
            <p className="text-white">Không có dữ liệu phim hot</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopMovies;
