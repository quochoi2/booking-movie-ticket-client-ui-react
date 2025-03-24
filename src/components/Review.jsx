import React from 'react'

const reviews = [
  { id: 1, name: 'Chris Curry', time: '1 Hour ago', comment: 'whachikan Just noticed that someone categorized this as belonging to the genre "demons" LOL', img: '/img/anime/review-1.jpg' },
  { id: 2, name: 'Lewis Mann', time: '5 Hours ago', comment: 'Finally it came out ages ago', img: '/img/anime/review-2.jpg' },
  { id: 3, name: 'Louis Tyler', time: '20 Hours ago', comment: 'Where is the episode 15? Slow update! Tch', img: '/img/anime/review-3.jpg' },
]

const Review = () => {
  return (
    <div className="w-full text-white py-10 rounded-lg">
      <div className="flex items-center mb-5">
        <h4 className="text-xl font-bold text-white border-l-4 border-red-500 pl-2 uppercase">Đánh giá</h4>
      </div>

      {reviews.map(review => (
        <div key={review.id} className="flex items-start space-x-4 bg-gray-800 p-4 rounded-lg mb-4">
          <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full" />
          <div>
            <h6 className="font-semibold">{review.name} - <span className="text-gray-400 text-sm">{review.time}</span></h6>
            <p style={{ margin: 0 }}>{review.comment}</p>
          </div>
        </div>
      ))}

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
  )
}

export default Review
