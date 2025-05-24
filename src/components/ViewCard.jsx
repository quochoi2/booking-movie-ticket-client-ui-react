import { useNavigate } from "react-router-dom"

const ViewCard = ({ id, title, image, episodes, views = 182 }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/detail/${id}`)}
      className="product__sidebar__view__item relative bg-cover bg-center rounded-lg overflow-hidden cursor-pointer" 
      style={{ 
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">{episodes}</div>
      <div className="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
        <i className="fa fa-eye"></i> {views}
      </div>
      <h5 
        className="text-white text-sm font-bold p-4 text-black"
        style={{
          padding: '12px 20px',
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          bottom: 0
        }}
      >
        <a
          style={{
            fontWeight: 500,
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '1.4',
            maxHeight: '3em' // 2 dòng * 1.4 line-height
          }}
        >
          {title}
        </a>
      </h5>
    </div>
  )
}

export default ViewCard
