import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiHeart, FiExternalLink } from 'react-icons/fi'

// Sample saved causes
const savedCauses = [
  {
    id: '1',
    title: 'Education for Underprivileged Children',
    description: 'Help provide quality education to underprivileged children in rural India.',
    image: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg',
    raisedAmount: 275000,
    goalAmount: 500000,
    category: 'education'
  },
  {
    id: '3',
    title: 'Clean Water Initiative',
    description: 'Help provide clean, safe drinking water to villages without access.',
    image: 'https://images.pexels.com/photos/1327691/pexels-photo-1327691.jpeg',
    raisedAmount: 450000,
    goalAmount: 750000,
    category: 'water'
  },
  {
    id: '6',
    title: 'Sustainable Farming for Small Farmers',
    description: 'Help small farmers adopt sustainable farming practices.',
    image: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg',
    raisedAmount: 320000,
    goalAmount: 800000,
    category: 'environment'
  }
]

function SavedCauses() {
  const [causes, setCauses] = useState(savedCauses)

  const handleRemoveCause = (id) => {
    setCauses(causes.filter(cause => cause.id !== id))
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Saved Causes</h2>
      
      {causes.length > 0 ? (
        <div className="space-y-6">
          {causes.map(cause => (
            <div key={cause.id} className="flex flex-col md:flex-row border border-gray-200 rounded-lg overflow-hidden">
              <div className="md:w-1/4">
                <img 
                  src={cause.image} 
                  alt={cause.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 md:w-3/4 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-xl mb-2">{cause.title}</h3>
                  <p className="text-gray-600 mb-4">{cause.description}</p>
                  
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
                </div>
                
                <div className="flex justify-between items-center mt-4">
                  <button 
                    onClick={() => handleRemoveCause(cause.id)} 
                    className="flex items-center text-red-500 hover:text-red-700"
                  >
                    <FiHeart className="mr-1" />
                    Remove
                  </button>
                  <div className="space-x-3">
                    <Link 
                      to={`/causes/${cause.id}`} 
                      className="inline-flex items-center text-primary-600 hover:text-primary-700"
                    >
                      <FiExternalLink className="mr-1" />
                      View
                    </Link>
                    <Link 
                      to={`/donate/${cause.id}`} 
                      className="btn-primary py-2"
                    >
                      Donate Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FiHeart className="text-gray-300 text-5xl mx-auto mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No Saved Causes</h3>
          <p className="text-gray-500 mb-6">You haven't saved any causes yet.</p>
          <Link to="/causes" className="btn-primary">
            Explore Causes
          </Link>
        </div>
      )}
    </div>
  )
}

export default SavedCauses