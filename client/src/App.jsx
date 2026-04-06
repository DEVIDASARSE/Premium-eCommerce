import React, { useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import CategoryPage from './pages/CategoryPage'
import Categories from './pages/Categories'
import CartPage from './pages/CartPage'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Register from './pages/Register'
import Auth from './pages/Auth'
import Sale from './pages/Sale'
import Drop from './pages/Drop'
import Instagram from './pages/Instagram'
import Dashboard from './pages/Dashboard'
import Orders from './pages/Orders'
import AdminDashboard from './pages/AdminDashboard'
import AdminOrders from './pages/AdminOrders'
import OrderSuccess from './pages/OrderSuccess'
import AdminRoute from './components/AdminRoute'
import ProtectedRoute from './components/ProtectedRoute'
import Wishlist from './pages/Wishlist'
import Loyalty from './pages/Loyalty'
import GiftCard from './pages/GiftCard'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { useReducedMotion } from 'framer-motion'
import QuickViewModal from './components/QuickViewModal'
import ScrollToTop from './components/ScrollToTop'
import BackToTop from './components/BackToTop'
import ScrollProgress from './components/ScrollProgress'
import useSmoothScroll from './hooks/useSmoothScroll'
import useScrollReveal from './hooks/useScrollReveal'

export default function App(){
  const location = useLocation()
  const reduceMotion = useReducedMotion()
  const scrollContainerRef = useRef(null)

  useSmoothScroll(scrollContainerRef, location.pathname)
  useScrollReveal(scrollContainerRef, location.pathname)

  return (
    <div className="min-h-[100dvh] flex flex-col bg-bg-light/70">
      <ScrollToTop />
      <ScrollProgress />
      <Navbar />
      <QuickViewModal />
      <div ref={scrollContainerRef} data-scroll-container className="flex-1">
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: 'easeOut' }}
            className="flex-1"
          >
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home/>} />
              <Route path="/shop" element={<Shop/>} />
              <Route path="/categories" element={<Categories/>} />
              <Route path="/category/:name" element={<CategoryPage/>} />
              <Route path="/product/:id" element={<ProductDetails/>} />
              <Route path="/cart" element={<CartPage/>} />
              <Route path="/checkout" element={<ProtectedRoute><Checkout/></ProtectedRoute>} />
              <Route path="/sale" element={<Sale/>} />
              <Route path="/drop/limited" element={<Drop/>} />
              <Route path="/instagram" element={<Instagram/>} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
              <Route path="/orders" element={<ProtectedRoute><Orders/></ProtectedRoute>} />
              <Route path="/order-success" element={<OrderSuccess/>} />
              <Route path="/admin" element={<AdminRoute><AdminDashboard/></AdminRoute>} />
              <Route path="/admin/orders" element={<AdminRoute><AdminOrders/></AdminRoute>} />
              <Route path="/wishlist" element={<Wishlist/>} />
              <Route path="/loyalty" element={<Loyalty/>} />
              <Route path="/gift-card" element={<GiftCard/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/contact" element={<Contact/>} />
              <Route path="/auth" element={<Auth/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/register" element={<Register/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
      <BackToTop />
    </div>
  )
}
