const BlogList = () => {
  const blogPosts = [
    {
      title: 'Housekishou Richard shi no Nazo Kantei Season 08 - 20',
      date: '01 March 2020',
      image: 'img/blog/blog-7.jpg'
    },
    {
      title: 'Fate/Stay Night: Untimated Blade World',
      date: '01 March 2020',
      image: 'img/blog/blog-10.jpg'
    },
    {
      title: 'Building a Better LiA Drilling Down',
      date: '01 March 2020',
      image: 'img/blog/blog-11.jpg'
    },
    {
      title: 'Fate/Stay Night: Untimated Blade World',
      date: '01 March 2020',
      image: 'img/blog/blog-2.jpg'
    },
    {
      title: 'Building a Better LiA Drilling Down',
      date: '01 March 2020',
      image: 'img/blog/blog-3.jpg'
    },
    {
      title: 'Yuri Kuma Arashi Viverra Tortor Pharetra',
      date: '01 March 2020',
      image: 'img/blog/blog-6.jpg'
    }
  ]

  return (
    <section className="text-white py-10">
      <div className="container mx-auto">
        <div className="flex items-center mb-5">
          <h4 className="text-xl font-bold text-white border-l-4 border-red-500 pl-2 uppercase">
            Bài viết nổi bật
          </h4>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div
              className="rounded-2xl shadow-lg bg-cover bg-center p-10 h-64 flex flex-col justify-end"
              style={{ backgroundImage: `url(${blogPosts[0].image})` }}
            >
              <p className="text-sm">📅 {blogPosts[0].date}</p>
              <h4 className="text-2xl font-bold mt-2">{blogPosts[0].title}</h4>
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-6">
              {blogPosts.slice(1, 3).map((post, index) => (
                <div
                  key={index}
                  className="rounded-2xl shadow-lg bg-cover bg-center p-6 h-64 flex flex-col justify-end"
                  style={{ backgroundImage: `url(${post.image})` }}
                >
                  <p className="text-sm">📅 {post.date}</p>
                  <h4 className="text-lg font-semibold mt-2">{post.title}</h4>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {blogPosts.slice(3, 5).map((post, index) => (
                <div
                  key={index}
                  className="rounded-2xl shadow-lg bg-cover bg-center p-6 h-64 flex flex-col justify-end"
                  style={{ backgroundImage: `url(${post.image})` }}
                >
                  <p className="text-sm">📅 {post.date}</p>
                  <h4 className="text-lg font-semibold mt-2">{post.title}</h4>
                </div>
              ))}
            </div>
            <div
              className="rounded-2xl shadow-lg bg-cover bg-center p-10 h-64 flex flex-col justify-end"
              style={{ backgroundImage: `url(${blogPosts[5].image})` }}
            >
              <p className="text-sm">📅 {blogPosts[5].date}</p>
              <h4 className="text-2xl font-bold mt-2">{blogPosts[5].title}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogList
