import { useEffect, useContext } from "react"
import BlogList from "../../components/BlogList"
import Hero from "../../components/Hero"
import MovieList from "../../components/MovieList"
import TopMovies from "../../components/TopMovies"
import { jwtDecode } from "jwt-decode"
import { UserContext } from "../../contexts/UserContext"

const Home = () => {
  const { login } = useContext(UserContext);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("access-token");

    if (token) {
      try {
        localStorage.setItem("accessToken", token);

        // Giải mã và lưu vào context
        const userInfo = jwtDecode(token);
        login(userInfo);
        
        // console.log(userInfo);

        // Xóa token khỏi URL để sạch sẽ
        const newUrl = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, newUrl);
      } catch (err) {
        console.error("Lỗi xử lý token từ URL:", err);
      }
    }
  }, [login]);

  return (  
    <div className="flex justify-center mx-5">
      <div>
        <Hero />
        <TopMovies className={"grid grid-cols-1 md:grid-cols-4 gap-4"} />
        <MovieList className={'grid grid-cols-1 md:grid-cols-4 gap-5'} />
        <BlogList />
      </div>
    </div>

  )
}
 
export default Home