import { Link } from 'react-router-dom'
import MovieCard from "./MovieCard"
import HomeService from '../services/homeService';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import Pagination from './Pagination';

const MovieList = ({ 
  className = '', 
  viewAll = '', 
  sectionClass, 
  showPagination = false,
  currentPage: externalPage,
  onPageChange,
  itemsPerPage = 8
}) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    totalItems: 0,
    currentPage: externalPage || 1, // Sử dụng externalPage nếu được truyền vào
    pageSize: itemsPerPage, // Sử dụng itemsPerPage từ props
    totalPages: 1
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const pageToFetch = showPagination ? pagination.currentPage : 1;
        // Truyền cả pageSize khi gọi API
        const response = await HomeService.getAllMovies(pageToFetch, pagination.pageSize);
        setMovies(response.data.data || []);

        if (response.data.pagination) {
          setPagination(prev => ({
            ...prev,
            totalItems: response.data.pagination.totalItems,
            totalPages: response.data.pagination.totalPages
          }));
        }
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [pagination.currentPage, pagination.pageSize, showPagination]);

  const handlePageChange = (page) => {
    setPagination(prev => ({...prev, currentPage: page}));
    if (onPageChange) {
      onPageChange(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <section className={`trending-now py-10 ${sectionClass}`}>
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold text-white border-l-4 border-red-500 pl-2 uppercase">Phim đang chiếu</h4>
            <Link to={'/movies'} className={`text-white bg-[#f44336] font-bold py-2 px-5 rounded-md ${viewAll}`}>Xem thêm</Link>
          </div>
          <div className="flex justify-center">
            <Loading />
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className={`trending-now py-10 ${sectionClass}`}>
        <div className="container mx-auto">
          <div className="text-center text-red-500">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className={`trending-now py-10 ${sectionClass}`}>
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-xl font-bold text-white border-l-4 border-red-500 pl-2 uppercase">Phim đang chiếu</h4>
          <Link to={'/movie'} className={`text-white bg-[#f44336] font-bold py-2 px-5 rounded-md ${viewAll}`}>Xem thêm</Link>
        </div>
      <div className={`${className}`}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        {showPagination && pagination.totalPages > 1 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  )
}

export default MovieList