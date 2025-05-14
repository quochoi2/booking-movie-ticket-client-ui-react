const Hero = () => {
  return (
    <section className="container hero__items bg-cover bg-center" style={{ backgroundImage: "url('img/hero/hero-1.jpg')" }}>
      <div className="container mx-auto py-20 max-w-screen-lg">
        <div className="max-w-lg">
          <div className="label text-white text-sm font-bold uppercase mb-2">Phiêu lưu</div>
          <h2 className="text-4xl font-extrabold text-white mb-4">Nơi phù hợp để gắn kết cùng mọi người</h2>
          <p className="text-white mb-6">Những bộ phim mới nhất, phù hợp cho mọi lứa tuổi, gia đình và bạn bè. Hãy cùng tham gia để trải nghiệm những điều tuyệt vời nhất...</p>
          <a href="#" className="bg-red-500 text-white px-6 py-3 rounded-md inline-block font-bold hover:bg-red-600 transition">
            Trải nghiệm ngay
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
