import { Outlet } from 'react-router-dom'

import Footer from './Participation/Footer'
import Header from './Participation/Header'

import '../index.css'

const DefaultLayout = () => {
  return (  
    <div className="min-h-screen flex flex-col">
      <Header />
        <main className="flex-1">
          <Outlet />
        </main>
      <Footer />
    </div>
  )
}
 
export default DefaultLayout