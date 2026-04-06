import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import { OrdersProvider } from './context/OrdersContext'
import { WishlistProvider } from './context/WishlistContext'
import ErrorBoundary from './components/ErrorBoundary'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <OrdersProvider>
          <WishlistProvider>
            <CartProvider>
              <ErrorBoundary>
                <App />
              </ErrorBoundary>
              <ToastContainer position="bottom-right" />
            </CartProvider>
          </WishlistProvider>
        </OrdersProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
