import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import { getAllCauses } from '../../services/causeService'

function FeatureCauses() {
  const causes = getAllCauses().slice(0, 3) // Only show first 3 causes on home page
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {causes.map((cause, index) => (
        <motion.div
          key={cause.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="card overflow-hidden"
        >
          <div className="relative">
            <img 
              src={cause.image} 
              alt={cause.title} 
              className="w-full h-48 object-cover"
            />
            {cause.urgentNeed && (
              <div className="absolute top-3 right-3 bg-warning-500 text-white text-xs font-semibold px-2 py-1 rounded">
                Urgent
              </div>
            )}
          </div>
          
          <div className="p-5">
            <h3 className="font-semibold text-xl mb-2 line-clamp-1">{cause.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{cause.description}</p>
            
            {/* Progress bar */}
            <div className="mb-4">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-primary-500 h-2.5 rounded-full" 
                  style={{ width: `${(cause.raisedAmount / cause.goalAmount) * 100}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="font-medium">₹{cause.raisedAmount.toLocaleString()}</span>
                <span className="text-gray-600">₹{cause.goalAmount.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <Link 
                to={`/causes/${cause.id}`} 
                className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center"
              >
                Learn More <FiArrowRight className="ml-1" />
              </Link>
              <Link 
                to={`/donate/${cause.id}`} 
                className="bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Donate
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default FeatureCauses