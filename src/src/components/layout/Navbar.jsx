import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { motion } from 'framer-motion'
import { FiGift, FiMenu, FiX, FiUser } from 'react-icons/fi'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { currentUser, logout } = useAuth()
  const location = useLocation()

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  // Change navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Causes', path: '/causes' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <FiGift className="text-primary-500 text-2xl mr-2" />
            <span className="text-xl font-bold text-gray-800">DonateKart</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <NavLink 
                key={link.name} 
                to={link.path}
                className={({ isActive }) => 
                  `relative text-sm font-medium ${isActive 
                    ? 'text-primary-600 after:w-full' 
                    : 'text-gray-700 hover:text-primary-500'} animated-underline`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Auth Buttons or User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {currentUser ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-500">
                  <FiUser className="text-lg" />
                  <span>{currentUser.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden origin-top-right transition-all duration-200 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100">
                  <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Dashboard</Link>
                  <button onClick={logout} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</button>
                </div>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 font-medium hover:text-primary-500">Log In</Link>
                <Link to="/signup" className="btn-primary py-2 px-4">Sign Up</Link>
              </>
            )}
            <Link to="/donate" className="btn-success py-2 px-4">Donate Now</Link>
          </div>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-gray-700 hover:text-primary-500"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-white"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container-custom py-4 space-y-4">
            {navLinks.map(link => (
              <NavLink 
                key={link.name} 
                to={link.path}
                className={({ isActive }) => 
                  `block py-2 ${isActive ? 'text-primary-600' : 'text-gray-700'}`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-4">
              {currentUser ? (
                <>
                  <Link to="/dashboard" className="block py-2 text-gray-700">Dashboard</Link>
                  <button onClick={logout} className="block py-2 text-gray-700">Sign Out</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="block py-2 text-gray-700">Log In</Link>
                  <Link to="/signup" className="block py-2 text-gray-700">Sign Up</Link>
                </>
              )}
              <Link to="/donate" className="btn-success w-full">Donate Now</Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  )
}

export default Navbar