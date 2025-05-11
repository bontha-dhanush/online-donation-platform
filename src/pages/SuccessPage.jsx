import { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FiCheckCircle, FiDownload, FiHome, FiArrowRight } from 'react-icons/fi'
import { motion } from 'framer-motion'

function SuccessPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const donation = location.state || {}

  // If no donation data, redirect to home
  useEffect(() => {
    if (!donation.amount) {
      navigate('/')
    }
  }, [donation, navigate])

  if (!donation.amount) {
    return null
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen pt-32 pb-12 bg-gray-50">
      <div className="container-custom">
        <motion.div 
          className="max-w-2xl mx-auto bg-white rounded-xl shadow-card p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mb-4">
              <FiCheckCircle className="text-3xl text-success-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Thank You!</h1>
            <p className="text-gray-600">Your donation has been successfully processed</p>
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 mb-8">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="text-xl font-semibold text-gray-800">₹{donation.amount}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p className="text-gray-800">{donation.transactionId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="text-gray-800">{formatDate(donation.date)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cause</p>
                <p className="text-gray-800">{donation.cause}</p>
              </div>
            </div>
          </div>

          <div className="bg-primary-50 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-primary-800 mb-2">Your Impact</h3>
            <p className="text-primary-700 mb-4">
              Your generous donation will help us {donation.cause.toLowerCase()} and make a real difference in many lives.
            </p>
            <p className="text-primary-700">
              We've sent a receipt to your email. Thank you for your support!
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <button className="btn-outline flex items-center justify-center">
              <FiDownload className="mr-2" />
              Download Receipt
            </button>
            <div className="flex gap-4">
              <Link to="/" className="btn-outline flex items-center justify-center">
                <FiHome className="mr-2" />
                Back to Home
              </Link>
              <Link to="/causes" className="btn-primary flex items-center justify-center">
                More Causes <FiArrowRight className="ml-2" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SuccessPage