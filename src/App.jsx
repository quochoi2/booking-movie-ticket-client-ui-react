import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { Blog } from './pages/Blog'
import { BlogDetail } from './pages/BlogDetail'
import { Detail } from './pages/Detail'
import { Favorite } from './pages/Favorite'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Movie } from './pages/Movie'
import { Register } from './pages/Register'
import { NotFound } from './pages/404'
import { DefaultLayout } from './Layouts'
import { LoaderProvider } from './contexts/LoaderContext'
import { Vertify } from './pages/Vertify'
import Success from './pages/Success/Success'
import ScrollToTop from './components/ScrollToTop'
import { Profile } from './pages/Profile'

function App() {
  return (
    <Router>
      {/* <LoaderProvider> */}
      <ScrollToTop />
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog-detail/:blogId" element={<BlogDetail />} />
          <Route path="/detail/:movieId" element={<Detail />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vertify" element={<Vertify />} />
        <Route path="/success" element={<Success />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* </LoaderProvider> */}
    </Router>
  )
}

export default App
