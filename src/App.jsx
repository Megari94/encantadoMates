import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Nav from './components/Nav.jsx'
import Footer from './components/Footer.jsx'
import CartPanel from './components/CartPanel.jsx'
import WhatsAppFAB from './components/WhatsAppFAB.jsx'
import Home from './pages/Home.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'

function StoreLayout({ children }) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
      <CartPanel />
      <WhatsAppFAB />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <StoreLayout>
                  <Home />
                </StoreLayout>
              }
            />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
