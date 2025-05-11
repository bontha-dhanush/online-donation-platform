import { Routes, Route } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import DonationPage from './pages/DonationPage'
import ProtectedRoute from './components/auth/ProtectedRoute'
import NotFound from './pages/NotFound'
import CausesPage from './pages/CausesPage'
import CauseDetails from './pages/CauseDetails'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SuccessPage from './pages/SuccessPage'

function App() {
  const { loading } = useAuth()
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/causes" element={<CausesPage />} />
          <Route path="/causes/:id" element={<CauseDetails />} />
          <Route path="/donate/:id?" element={<DonationPage />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route
            path="/dashboard/*"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App