import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx'

import './index.css'
import { UserProvider } from './contexts/UserContext.jsx'
import { OrderProvider } from './contexts/OrderContext.jsx'

// Tạo query client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <OrderProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </OrderProvider>
    </UserProvider>
  </StrictMode>
)
