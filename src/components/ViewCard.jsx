const ViewCard = ({ title, image, episodes, views }) => {
  return (
    <div className="product__sidebar__view__item relative bg-cover bg-center rounded-lg overflow-hidden" style={{ backgroundImage: `url(${image})` }}>
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">{episodes}</div>
      <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
        <i className="fa fa-eye"></i> {views}
      </div>
      <h5 className="text-white text-sm font-bold p-4">
        <a href="#">{title}</a>
      </h5>
    </div>
  )
}

export default ViewCard
