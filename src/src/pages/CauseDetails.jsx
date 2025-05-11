import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { FiShare2, FiHeart, FiArrowRight, FiClock, FiUsers, FiTarget } from 'react-icons/fi'
import { getCauseById } from '../services/causeService'

function CauseDetails() {
  const { id } = useParams()
  const [cause, setCause] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    setLoading(true)
    getCauseById(id)
      .then(data => {
        setCause(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching cause:', error)
        toast.error('Failed to load cause details')
        setLoading(false)
      })
  }, [id])

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: cause.title,
        text: 'Check out this cause and consider donating',
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard')
    }
  }

  const handleSaveCause = () => {
    setIsSaved(!isSaved)
    toast.success(isSaved ? 'Removed from saved causes' : 'Added to saved causes')
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-12 flex justify-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!cause) {
    return (
      <div className="min-h-screen pt-32 pb-12 container-custom">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Cause Not Found</h1>
          <p className="text-xl text-gray-600 mb-8">The cause you're looking for doesn't exist or has been removed.</p>
          <Link to="/causes" className="btn-primary">
            Explore Other Causes
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-12">
      <div className="container-custom">
        <div className="mb-8">
          <Link to="/causes" className="text-primary-600 hover:text-primary-700 font-medium">
            &larr; Back to All Causes
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative mb-6">
                <img 
                  src={cause.image} 
                  alt={cause.title} 
                  className="w-full h-auto rounded-xl"
                />
                {cause.urgentNeed && (
                  <div className="absolute top-4 right-4 bg-warning-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Urgent Need
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{cause.title}</h1>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <FiClock className="mr-2" />
                  <span>{cause.daysLeft} days left</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiUsers className="mr-2" />
                  <span>{cause.donorsCount} donors</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <FiTarget className="mr-2" />
                  <span>{cause.category}</span>
                </div>
              </div>
              
              <div className="mb-8">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-primary-500 h-3 rounded-full" 
                    style={{ width: `${(cause.raisedAmount / cause.goalAmount) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-3">
                  <div>
                    <div className="text-2xl font-bold text-gray-800">₹{cause.raisedAmount.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">raised of ₹{cause.goalAmount.toLocaleString()}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">
                      {Math.floor((cause.raisedAmount / cause.goalAmount) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">funded</div>
                  </div>
                </div>
              </div>
              
              <div className="prose prose-lg max-w-none mb-8">
                <p className="text-gray-700 mb-4 text-lg">{cause.description}</p>
                <div className="whitespace-pre-line text-gray-700">
                  {cause.detailedDescription}
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={handleShare}
                  className="flex items-center btn-outline"
                >
                  <FiShare2 className="mr-2" />
                  Share This Cause
                </button>
                <button 
                  onClick={handleSaveCause}
                  className={`flex items-center ${
                    isSaved 
                      ? 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100' 
                      : 'btn-outline'
                  } border px-6 py-3 rounded-lg font-medium transition-all`}
                >
                  <FiHeart className={`mr-2 ${isSaved ? 'fill-current' : ''}`} />
                  {isSaved ? 'Saved' : 'Save'}
                </button>
              </div>
            </motion.div>
          </div>
          
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-xl shadow-card p-6 sticky top-24"
            >
              <h2 className="text-2xl font-semibold mb-6">Make a Donation</h2>
              
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[500, 1000, 2000, 5000].map(amount => (
                  <button 
                    key={amount}
                    className="border-2 border-gray-200 hover:border-primary-300 rounded-lg py-3 text-gray-700 font-medium transition-colors"
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
              
              <Link 
                to={`/donate/${cause.id}`}
                className="btn-primary w-full flex justify-center items-center mb-6"
              >
                Donate Now <FiArrowRight className="ml-2" />
              </Link>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Why Your Donation Matters</h3>
                <p className="text-sm text-gray-600">
                  Your contribution will directly impact the lives of those in need.
                  We ensure that your donation is used efficiently and transparently.
                </p>
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Share This Cause</h3>
                <div className="flex space-x-3">
                  <a href="#" className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="sr-only">Facebook</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>
                  <a href="#" className="bg-sky-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="sr-only">Twitter</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="bg-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="sr-only">WhatsApp</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.13.332.202.043.72.043.419-.101.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z" />
                    </svg>
                  </a>
                  <button onClick={handleShare} className="bg-primary-500 text-white w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="sr-only">Share Link</span>
                    <FiShare2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CauseDetails