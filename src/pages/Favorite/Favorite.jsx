import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import Loading from "../../components/Loading";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../components/Pagination";
import FavoriteService from "../../services/favoriteService";

const Favorite = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 1,
    itemsPerPage: 5
  });

  // Hàm fetch danh sách phim yêu thích
  const fetchFavoriteMovies = async (page = 1) => {
    try {
      setLoading(true);
      const response = await FavoriteService.getAllMovieByUser(page, pagination.itemsPerPage);
      // console.log(response.data);
      
      if (response.data.code === 0) {
        const favoriteData = response.data.data;
        const paginationData = response.data.pagination; 

        // console.log(paginationData);
        
        setFavorites(favoriteData);
        setPagination({
          currentPage: paginationData.currentPage,
          totalPages: paginationData.totalPages,
          totalItems: paginationData.totalItems,
          itemsPerPage: paginationData.itemsPerPage
        });
      } else {
        setError(response.data.message || 'Lỗi khi tải danh sách phim');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi kết nối đến server');
      console.error('Error fetching favorite movies:', err);
    } finally {
      setLoading(false);
    }
  };

  // Hàm xử lý thay đổi trang
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchFavoriteMovies(newPage);
    }
  };

  // Load data khi component mount
  useEffect(() => {
    fetchFavoriteMovies(1);
  }, []);

  if (loading) return <Loading />;

  return (  
    <div className="flex justify-center mx-10 sm:mx-5">
      <div>
        <Breadcrumb items={['Yêu thích', 'Danh sách phim yêu thích']} />
        <div className="max-w-[1170px] mt-10">
          {error ? (
            <div className="text-center py-10 text-red-500">{error}</div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Bạn chưa có phim nào trong danh sách yêu thích
            </div>
          ) : (
            <section className="trending-now">
              <div className="container mx-auto">
                <div className="flex justify-between items-center mb-6">
                  <h4 className="text-xl font-bold text-white border-l-4 border-red-500 pl-2 uppercase">Phim yêu thích</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {favorites.map((favorite) => (
                    <MovieCard 
                      key={favorite.Movie.id} 
                      movie={favorite.Movie} 
                      showFavoriteButton={false}
                    />
                  ))}
                </div>
                
                {pagination.totalItems >= 1 && (
                  <div className="mt-8">
                    <Pagination
                      currentPage={pagination.currentPage}
                      totalPages={pagination.totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorite;