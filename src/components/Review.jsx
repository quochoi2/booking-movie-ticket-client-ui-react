import React, { useEffect, useState } from 'react';
import PreviewService from '../services/previewService';

const Review = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
      
        const res = await PreviewService.getAllPreviewByMovie(movieId);
        console.log(res);
        setReviews(res.data.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className="w-full text-white py-10 rounded-lg">
      <div className="flex items-center mb-5">
        <h4 className="text-xl font-bold text-white border-l-4 border-red-500 pl-2 uppercase">Đánh giá</h4>
      </div>

      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="flex items-start space-x-4 bg-gray-800 p-4 rounded-lg mb-4">
            <img
              src={review.User?.image || '/img/user-default.jpg'}
              alt={review.User?.fullname || 'User'}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h6 className="font-semibold">
                {review.User?.fullname || review.User?.username} -{' '}
                <span className="text-gray-400 text-sm">
                  {new Date(review.createdAt).toLocaleString()}
                </span>
              </h6>
              <p style={{ margin: 0 }}>{review.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400">Chưa có đánh giá nào.</p>
      )}

      <div className="mt-10">
        <div className="flex items-center mb-5">
          <h4 className="text-xl font-bold text-white border-l-4 border-red-500 pl-2 uppercase">Bình luận</h4>
        </div>
        <textarea
          placeholder="Your Comment"
          className="w-full bg-white p-3 rounded-lg text-black"
          rows="4"
        ></textarea>
        <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mt-2">Đăng</button>
      </div>
    </div>
  );
};

export default Review;
