import React from 'react'

const BlogSection = ({ title, imgSrc, text }) => (
  <div className="blog__details__item__text max-w-[750px]">
    <h4 style={{ marginBottom: '20px' }}>{title}</h4>
    <img src={imgSrc} alt={title} />
    <p className=' text-[17px] leading-[28px]'>{text}</p>
  </div>
)

const BlogDetail = () => {
  return (
    <div className="flex justify-center mx-5">
      <div>
        <section className="blog-details spad">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="blog__details__title text-center">
                <div className='flex justify-center'>
                  <h2 style={{ maxWidth: '750px' }}>Anime dành cho người mới bắt đầu: 20 tác phẩm cần xem</h2>
                </div>
                <div className="blog__details__social">
                  <a className="facebook flex justify-center">Facebook</a>
                  <a className="pinterest flex justify-center">Pinterest</a>
                  <a className="linkedin flex justify-center">Linkedin</a>
                  <a className="twitter flex justify-center">Twitter</a>
                </div>
              </div>
              <div>
                <div className="blog__details__pic">
                  <img src="/img/blog/details/blog-details-pic.jpg" alt="Anime Blog" />
                </div>
              </div>
              <div className="flex justify-center">
                <div className="blog__details__content grid grid-cols-1">
                  <p style={{ maxWidth: '750px', fontSize: '17px', marginBottom: '42px', lineHeight: '28px' }}>
                    Kết quả là vài tập cuối không thực sự thú vị đối với tôi, vì chúng giống như việc ổn định trong một thói quen quen thuộc và thoải mái hơn. Chúng ta đang thấy sự phát triển của nhân vật ở đây nhưng rất tinh tế (có thể nói là ngoại trừ Shouyou). Ý tôi là, việc Tobio là một thằng khốn nạn không phải là điều gì mới mẻ – nó giống như nền tảng của toàn bộ cốt truyện nhân vật của anh ta. Đối mặt với việc liệu việc anh ta là một thằng khốn nạn có phải là vấn đề đối với Crows hay không, đây trực tiếp là một sự tiến hóa, và có lẽ là một sự tiến hóa đã quá hạn, nhưng động lực chung với Kageyama về cơ bản là không thay đổi.
                  </p>
                  <BlogSection
                    title="Tobio-Nishinoya showdown"
                    imgSrc="/img/blog/details/bd-item-1.jpg"
                    text="Ở Nhật Bản, ý tưởng về một cầu thủ năm nhất nói chuyện với một đàn anh theo cách Kageyama đã làm với Asahi gây sốc hơn nhiều so với ở phương Tây, nhưng việc Tobio gọi đồng đội theo cách thực sự thô lỗ giữa trận đấu là điều khiến anh ta bị cô lập ngay từ đầu. Crows nên giải quyết vấn đề này trong các trận đấu thực hành hơn là trong trận đấu thực sự, nhưng điều này thực sự phụ thuộc vào Tobio – anh ta phải tìm ra cách để cùng tồn tại với những người khác trong môi trường đồng đội."
                  />
                  <BlogSection
                    title="Nanatsu no Taizai: Kamigami No Gekirin"
                    imgSrc="/img/blog/details/bd-item-2.jpg"
                    text="Ở Nhật Bản, ý tưởng về một cầu thủ năm nhất nói chuyện với một đàn anh theo cách Kageyama đã làm với Asahi gây sốc hơn nhiều so với ở phương Tây, nhưng việc Tobio gọi đồng đội theo cách thực sự thô lỗ giữa trận đấu là điều khiến anh ta bị cô lập ngay từ đầu. Crows nên giải quyết vấn đề này trong các trận đấu thực hành hơn là trong trận đấu thực sự, nhưng điều này thực sự phụ thuộc vào Tobio – anh ta phải tìm ra cách để cùng tồn tại với những người khác trong môi trường đồng đội."
                  />
                  <BlogSection
                    title="ID: Invaded"
                    imgSrc="/img/blog/details/bd-item-3.jpg"
                    text="Ở Nhật Bản, ý tưởng về một cầu thủ năm nhất nói chuyện với một đàn anh theo cách Kageyama đã làm với Asahi gây sốc hơn nhiều so với ở phương Tây, nhưng việc Tobio gọi đồng đội theo cách thực sự thô lỗ giữa trận đấu là điều khiến anh ta bị cô lập ngay từ đầu. Crows nên giải quyết vấn đề này trong các trận đấu thực hành hơn là trong trận đấu thực sự, nhưng điều này thực sự phụ thuộc vào Tobio – anh ta phải tìm ra cách để cùng tồn tại với những người khác trong môi trường đồng đội."
                  />
                  <div className="blog__details__tags">
                    <a href="#">Healthfood</a>
                    <a href="#">Sport</a>
                    <a href="#">Game</a>
                  </div>
                  <div className="blog__details__btns">
                    <div className="flex justify-between">
                      <div className="">
                        <a href="#">&larr; Previous Article</a>
                      </div>
                      <div className="text-right">
                        <a href="#">Next Article &rarr;</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default BlogDetail;
