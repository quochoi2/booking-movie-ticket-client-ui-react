import { BrowserRouter as Router, Route, Routes } from "react-router-dom"

import { Blog } from './pages/Blog'
import { BlogDetail } from './pages/BlogDetail'
import { Detail } from './pages/Detail'
import { Favorite } from './pages/Favorite'
import { Home } from './pages/Home'
import { Login } from './pages/Login'
import { Movie } from './pages/Movie'
import { Register } from './pages/Register'
import { NotFound } from './pages/404'
import { DefaultLayout } from "./Layouts"
import { LoaderProvider } from "./contexts/LoaderContext"
import { Vertify } from "./pages/Vertify"

function App() {
  return (
    <Router>
      <LoaderProvider>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path='/blog' element={<Blog />} />
            <Route path='/blog-detail/:blogId' element={<BlogDetail />} />
            <Route path='/detail/:detailId' element={<Detail />} />
            <Route path='/favorite' element={<Favorite />} />
            <Route path='/movie' element={<Movie />} />
            <Route path='/' element={<Home />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/vertify' element={<Vertify />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </LoaderProvider>
    </Router>
  )
}

export default App
