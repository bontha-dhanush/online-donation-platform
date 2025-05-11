import { Link } from 'react-router-dom'
import { FiGift, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <FiGift className="text-primary-400 text-2xl mr-2" />
              <span className="text-xl font-bold text-white">DonateKart</span>
            </Link>
            <p className="text-sm text-gray-400">
              Making giving easier. Join us in creating positive change through the power of collective giving.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                <FaLinkedinIn />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/causes" className="text-gray-400 hover:text-primary-400 transition-colors">Our Causes</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/donate" className="text-gray-400 hover:text-primary-400 transition-colors">Donate Now</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Terms of Service</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Volunteer</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">Donate Monthly</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FiMapPin className="text-primary-400 mt-1 mr-3" />
                <span>123 Charity Lane, Mumbai, Maharashtra, India 400001</span>
              </li>
              <li className="flex items-center">
                <FiPhone className="text-primary-400 mr-3" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center">
                <FiMail className="text-primary-400 mr-3" />
                <span>contact@donatekart.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>© {currentYear} DonateKart. All rights reserved.</p>
          <p className="mt-2">Made with <FiGift className="inline text-primary-400" /> for a better world.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer