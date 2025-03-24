import BreadcrumbHero from '../../components/BreadcrumbHero'
import BlogList from "../../components/BlogList"

const Blog = () => {
  return (
    <>
      <BreadcrumbHero 
        title={'Our Blog'}
        description={'Welcome to the official Anime blog.'}
      />
      <div className="flex justify-center mx-5">
        <div>
          <BlogList />
        </div>
      </div>
    </>  
  )
}
 
export default Blog