import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faComment, faHeart } from '@fortawesome/free-solid-svg-icons'
import Breadcrumb from '../../components/Breadcrumb'
import Showtime from '../../components/ShowTime'
import Review from '../../components/Review'
import TopMovies from '../../components/TopMovies'

const Detail = () => {
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
                  <div className="anime__details__pic bg-cover bg-center" style={{ backgroundImage: `url(/img/anime/details-pic.jpg)` }}>
                    <div className="comment text-white"><FontAwesomeIcon icon={faComment} /> 11</div>
                    <div className="view text-white"><FontAwesomeIcon icon={faEye} /> 9141</div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-9">
                  <div className="anime__details__text">
                    <div className="anime__details__title">
                      <h3>Fate Stay Night: Unlimited Blade</h3>
                      <span>フェイト／ステイナイト, Feito／sutei naito</span>
                    </div>
                    <p>
                      Mọi con người sống trong thế giới Alcia đều được đánh dấu bằng một "Bá tước" hoặc một con số được viết trên cơ thể họ. Đối với mẹ của Hina,
                      tổng số của bà giảm xuống 0 và bà bị kéo vào Vực thẳm, không bao giờ được nhìn thấy nữa. Nhưng những lời cuối cùng của mẹ cô đã đưa Hina vào
                      nhiệm vụ tìm kiếm một anh hùng huyền thoại từ Cuộc chiến tranh chất thải - Ace huyền thoại!
                    </p>
                    <div className="anime__details__widget">
                      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4">
                        <ul>
                          <li><span>Thể loại:</span> TV Series</li>
                          <li><span>Studio:</span> Lerche</li>
                          <li><span>Ngày công chiếu:</span> 20/10/2025</li>
                          <li><span>Tình trạng:</span> Đang ra mắt</li>
                          <li><span>Thể loại:</span> Hành động, Phiêu lưu, Fantasy, Phép thuật</li>
                        </ul>
                        <ul>
                          <li><span>Điểm số:</span> 7.31 / 1,515</li>
                          <li><span>Đánh giá:</span> 8.5 / 161 times</li>
                          <li><span>Thời lượng:</span> 24 min/ep</li>
                          <li><span>Chất lượng:</span> HD</li>
                          <li><span>Lượt xem:</span> 131,541</li>
                        </ul>
                      </div>
                    </div>
                    <div className="anime__details__btn flex space-x-4 mt-4">
                      <button className="follow-btn bg-red-500 text-white py-2 px-4 rounded"><FontAwesomeIcon icon={faHeart} /> Yêu thích</button>
                      <button className="follow-btn bg-blue-500 text-white py-2 px-4 rounded"><span>Mua ngay</span></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* showtime */}
            <Showtime />

            {/* review */}
            <div className='md:flex md:gap-10 md:justify-between'>
              <Review />
              <TopMovies />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Detail
