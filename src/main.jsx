import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'

import './index.css'
import { UserProvider } from './contexts/UserContext.jsx'
import { OrderProvider } from './contexts/OrderContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
        <OrderProvider>
          <App />
        </OrderProvider>
    </UserProvider>
  </StrictMode>,
)
