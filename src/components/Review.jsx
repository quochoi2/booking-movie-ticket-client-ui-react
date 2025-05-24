import React, { useEffect, useState } from 'react';
import PreviewService from '../services/previewService';

const Review = ({ movieId }) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [isLoading, setIsLoading] = useState(false);

  // Lấy ID user hiện tại
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUserId(user.id);
    }
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await PreviewService.getAllPreviewByMovie(movieId);
      setReviews(res.data.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };


  // Lấy danh sách bình luận
  useEffect(() => {
    fetchReviews();
  }, [movieId]);

  // Thêm bình luận mới
  const handleAddReview = async () => {
    if (!comment.trim() || !currentUserId) return;
    
    try {
      setIsLoading(true);
      const newReview = {
        movieId,
        content: comment,
        rate: rating,
        userId: currentUserId,
      };

      const res = await PreviewService.createPreview(newReview);
      
      setReviews([res.data.data, ...reviews]);
      setComment('');
      setRating(5);
      alert('Đăng bình luận thành công')
      fetchReviews();
    } catch (error) {
      console.error('Error adding review:', error);
      alert(error.response?.data?.message || 'Lỗi khi thêm bình luận');
    } finally {
      setIsLoading(false);
    }
  };

  // Xóa bình luận
  const handleDeleteReview = async (previewId) => {
    if (!window.confirm('Bạn chắc chắn muốn xóa bình luận này?')) return;
    
    try {
      await PreviewService.deletePreview(previewId);
      setReviews(reviews.filter(review => review.id !== previewId));
    } catch (error) {
      console.error('Error deleting review:', error);
      alert(error.response?.data?.message || 'Lỗi khi xóa bình luận');
    }
  };

  return (
    <div className="w-full text-white py-10 rounded-lg">
      <div className="flex items-center mb-5">
        <h4 className="text-xl font-bold text-white border-l-4 border-red-500 pl-2 uppercase">Đánh giá</h4>
      </div>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="flex items-start space-x-4 bg-gray-800 p-4 rounded-lg mb-4 relative">
            <img
              src={review.User?.image || '/img/user-default.jpg'}
              alt={review.User?.fullname || 'User'}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h6 className="font-semibold">
                {review.User?.fullname || review.User?.username} -{' '}
                <span className="text-gray-400 text-sm">
                  {new Date(review.createdAt).toLocaleString()}
                </span>
                {review.rate && (
                  <span className="ml-2 text-yellow-400">
                    {'★'.repeat(review.rate)}{'☆'.repeat(5 - review.rate)}
                  </span>
                )}
              </h6>
              <p style={{ margin: 0 }}>{review.content}</p>
              
              {currentUserId && review.User?.id === currentUserId && (
                <div className="absolute top-2 right-2 flex space-x-2">
                  {/* <button 
                    onClick={() => startEditing(review)}
                    className="text-gray-400 hover:text-blue-500"
                  >
                    Sửa
                  </button> */}
                  <button 
                    onClick={() => handleDeleteReview(review.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    Xóa
                  </button>
                </div>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">Chưa có đánh giá nào.</p>
      )}

      <div className="mt-10">
        <div className="flex items-center mb-5">
          <h4 className="text-xl font-bold text-white border-l-4 border-red-500 pl-2 uppercase">
            {'Bình luận'}
          </h4>
        </div>
        
        <div className="mb-3">
          <span className="text-yellow-400 text-xl">
            {[1, 2, 3, 4, 5].map((star) => (
              <span 
                key={star} 
                onClick={() => setRating(star)}
                className="cursor-pointer"
              >
                {star <= rating ? '★' : '☆'}
              </span>
            ))}
          </span>
        </div>
        
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Nhập bình luận của bạn..."
          className="w-full bg-white p-3 rounded-lg text-black"
          rows="4"
        ></textarea>
        
        <button 
          onClick={handleAddReview}
          disabled={isLoading || !comment.trim()}
          className={`${isLoading ? 'bg-gray-500' : 'bg-red-500 hover:bg-red-600'} text-white py-2 px-4 rounded-lg mt-2`}
        >
          {isLoading ? 'Đang xử lý...' : 'Đăng bình luận'}
        </button>
      </div>
    </div>
  );
};

export default Review;