import { useEffect, useContext } from 'react'
import BlogList from '../../components/BlogList'
import Hero from '../../components/Hero'
import MovieList from '../../components/MovieList'
import TopMovies from '../../components/TopMovies'
import { jwtDecode } from 'jwt-decode'
import { UserContext } from '../../contexts/UserContext'

const Home = () => {
  const { login } = useContext(UserContext)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get('access-token')
    const userJson = params.get('user') // Lấy chuỗi JSON user từ URL

    if (token) {
      try {
        localStorage.setItem('accessToken', token)

        // Giải mã user từ JSON (KHÔNG cần dùng atob vì không mã hóa base64)
        let userInfo = jwtDecode(token)
        if (userJson) {
          const decodedUserData = JSON.parse(decodeURIComponent(userJson))
          userInfo = {
            ...userInfo,
            ...decodedUserData // Gộp thông tin từ token và user data
          }
        }

        localStorage.setItem('user', JSON.stringify(userInfo))
        login(userInfo)

        // Xóa token và user data khỏi URL
        const newUrl = window.location.origin + window.location.pathname
        window.history.replaceState({}, document.title, newUrl)
      } catch (err) {
        console.error('Lỗi xử lý token từ URL:', err)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('user')
      }
    }
  }, [login])

  return (
    <div className="flex justify-center mx-5">
      <div>
        <Hero />
        <TopMovies className={'grid grid-cols-1 md:grid-cols-4 gap-4'} />
        <MovieList className={'grid grid-cols-1 md:grid-cols-4 gap-5 pb-20'} />
        {/* <BlogList /> */}
      </div>
    </div>
  )
}

export default Home
