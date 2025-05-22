import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import Breadcrumb from '../../components/Breadcrumb'
import Showtime from '../../components/ShowTime'
import Review from '../../components/Review'
import TopMovies from '../../components/TopMovies'
import DetailService from '../../services/movieDetailService'
import { useParams } from 'react-router-dom'
import { formatDate } from '../../utils/FormatDate'
import Loading from '../../components/Loading'
import { useOrder } from '../../contexts/OrderContext'

const Detail = () => {
  const { movieId } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // luu movie
  const { updateOrderData } = useOrder()

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true)
        const response = await DetailService.getMovieById(movieId)
        // console.log('API Response:', response)
        setMovie(response.data)
        updateOrderData({
          movieId: Number(movieId),
          title: response.data.title,
        })
      } catch (err) {
        setError(err.message || 'Lỗi khi tải dữ liệu phim')
      } finally {
        setLoading(false)
      }
    }

    if (movieId) {
      fetchMovie()
    }
  }, [movieId])

  if (loading) return <Loading />
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>
  if (!movie) return <div className="text-center py-8">Không có thông tin phim</div>

  return (
    <div className="flex justify-center mx-5">
      <div>
        <Breadcrumb />
        <section className="anime-details spad">
          <div className="container">
            {/* infor */}
            <div className="anime__details__content">
              <div className="grid grid-cols-12 gap-4">
                <div className="col-span-12 md:col-span-3">
                  {/* movie.image */}
                  <div className="anime__details__pic bg-cover bg-center" 
                    style={{ backgroundImage: `url(${movie.image})` || `url(/img/anime/details-pic.jpg)` }}
                  >
                    {/* <div className="comment text-white"><FontAwesomeIcon icon={faComment} /> 11</div> */}
                    {/* <div className="view text-white"><FontAwesomeIcon icon={faEye} /> 9141</div> */}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <div className="anime__details__text">
                    <div className="anime__details__title">
                      {/* movie.title */}
                      <h3>{movie.title || 'Fate Stay Night: Unlimited Blade'}</h3> 
                      {/* movie.titleAnother */}
                      <span>{movie.titleAnother || 'フェイト／ステイナイト, Feito／sutei naito'}</span> 
                    </div>
                    {/* movie.description */}
                    <p>
                      {movie.description ||
                        `
                          Mọi con người sống trong thế giới Alcia đều được đánh dấu bằng một "Bá tước" hoặc một con số được viết trên cơ thể họ. Đối với mẹ của Hina,
                          tổng số của bà giảm xuống 0 và bà bị kéo vào Vực thẳm, không bao giờ được nhìn thấy nữa. Nhưng những lời cuối cùng của mẹ cô đã đưa Hina vào
                          nhiệm vụ tìm kiếm một anh hùng huyền thoại từ Cuộc chiến tranh chất thải - Ace huyền thoại!
                        `
                      }
                    </p>
                    <div className="anime__details__widget">
                      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                        <ul>
                          {/* movie.type */}
                          <li><span>Thể loại:</span> {movie.type || 'TV Series'}</li>
                          {/* movie.studio */}
                          <li><span>Studio:</span> {movie.studio || 'Lerche'}</li>
                          {/* moive.dateAired */}
                          <li><span>Khởi chiếu:</span> {formatDate(movie.dateAired) || '20/10/2025'}</li>
                          {/* movie.status == 0 ? Đã ra mắt : Đang ra mắt */}
                          <li><span>Tình trạng:</span> {movie.status === 0 ? 'Đã ra mắt' : 'Đang ra mắt'}</li>
                          {/* khong can them the loai, de mac dinh */}
                          <li><span>Thể loại:</span> Hành động, Phiêu lưu, Fantasy</li>
                        </ul>
                        <ul>
                          {/* movie.score */}
                          <li><span>Điểm số:</span> {movie.score || 8} / 10</li>
                          {/* movie.Previews.count đếm cho tôi xem có bao nhiêu bình luận */}
                          <li><span>Đánh giá:</span> {movie.Previews?.length || 12}</li>
                          {/* movie.duration */}
                          <li><span>Thời lượng:</span> {movie.duration || 120} phút</li>
                          {/* movie.quality */}
                          <li><span>Chất lượng:</span> {movie.quality || 'HD'}</li>
                          {/* de mac dinh */}
                          <li><span>Lượt theo dõi:</span> 131,541</li>
                        </ul>
                      </div>
                    </div>
                    <div className="anime__details__btn flex space-x-4 mt-4">
                      <button className="follow-btn bg-red-500 text-white py-2 px-4 rounded cursor-pointer"><FontAwesomeIcon icon={faHeart} /> Yêu thích</button>
                      <button className="follow-btn bg-blue-500 text-white py-2 px-4 rounded cursor-pointer"><span>Đặt vé ngay</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* showtime */}
            <Showtime showtimes={movie.Showtimes}/>

            {/* review */}
            <div className='md:flex md:gap-10 md:justify-between'>
              <Review movieId={movieId} />
              <TopMovies />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Detail
