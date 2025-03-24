const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-800 rounded-md overflow-hidden">
      <div className="relative">
        <img src={movie.img} alt={movie.title} className="w-full h-[350px] object-fit" />
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">Hot</div>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md">💬 11</div>
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded-md">👁️ 9141</div>
      </div>
      <div className="p-4">
        <ul className="flex flex-wrap space-x-2 text-xs text-gray-400 my-2">
          {['Active', 'Action', 'Comedy', 'Cartoon'].map((obj, index) => (
            <li key={index} className='py-2 mr-2'>{obj}</li>
          ))}
        </ul>
        <h5 className="text-white font-bold text-sm"><a href="#">{movie.title}</a></h5>
      </div>
    </div>
  )
}

export default MovieCard
