import { Link } from 'react-router-dom'
import { FiArrowLeft, FiHome } from 'react-icons/fi'

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-primary-500">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.history.back()} 
            className="btn-outline flex items-center justify-center"
          >
            <FiArrowLeft className="mr-2" />
            Go Back
          </button>
          <Link to="/" className="btn-primary flex items-center justify-center">
            <FiHome className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound