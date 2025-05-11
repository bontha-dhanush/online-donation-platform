import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiFilter, FiHeart, FiSearch, FiArrowRight } from 'react-icons/fi'
import { getAllCauses, getCausesByCategory, getUrgentCauses } from '../services/causeService'

function CausesPage() {
  const [causes, setCauses] = useState([])
  const [filteredCauses, setFilteredCauses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [showUrgentOnly, setShowUrgentOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    setCauses(getAllCauses())
    setFilteredCauses(getAllCauses())
  }, [])

  useEffect(() => {
    let result = causes

    // Apply category filter
    if (selectedCategory !== 'all') {
      result = getCausesByCategory(selectedCategory)
    }

    // Apply urgent filter
    if (showUrgentOnly) {
      result = result.filter(cause => cause.urgentNeed)
    }

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        cause => 
          cause.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cause.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredCauses(result)
  }, [causes, selectedCategory, showUrgentOnly, searchTerm])

  const categories = [
    { id: 'all', name: 'All Causes' },
    { id: 'education', name: 'Education' },
    { id: 'healthcare', name: 'Healthcare' },
    { id: 'water', name: 'Clean Water' },
    { id: 'disaster', name: 'Disaster Relief' },
    { id: 'women', name: 'Women & Children' },
    { id: 'environment', name: 'Environment' }
  ]

  return (
    <div className="min-h-screen pt-32 pb-12">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Our Causes</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the causes we support and join us in making a difference. 
            Every donation, no matter how small, contributes to positive change.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search causes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10 w-full"
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center md:hidden px-4 py-2 border border-gray-300 rounded-md font-medium text-gray-700"
            >
              <FiFilter className="mr-2" />
              Filters
            </button>
            
            <div className="hidden md:flex items-center space-x-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </button>
              ))}
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  showUrgentOnly
                    ? 'bg-warning-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                onClick={() => setShowUrgentOnly(!showUrgentOnly)}
              >
                Urgent Needs
              </button>
            </div>
          </div>
          
          {/* Mobile filters */}
          {showFilters && (
            <div className="md:hidden mt-4 border-t pt-4">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? 'bg-primary-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="urgentOnly"
                  checked={showUrgentOnly}
                  onChange={() => setShowUrgentOnly(!showUrgentOnly)}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="urgentOnly" className="ml-2 block text-sm text-gray-700">
                  Show urgent needs only
                </label>
              </div>
            </div>
          )}
        </div>

        {filteredCauses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCauses.map((cause, index) => (
              <motion.div
                key={cause.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
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
                  <button className="absolute top-3 left-3 bg-white p-2 rounded-full text-gray-500 hover:text-red-500 transition-colors">
                    <FiHeart />
                  </button>
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
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <FiSearch className="text-gray-300 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">No Causes Found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => {
                setSelectedCategory('all')
                setSearchTerm('')
                setShowUrgentOnly(false)
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-16 bg-primary-50 rounded-xl p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold text-primary-800 mb-4">Not Sure Where to Donate?</h2>
              <p className="text-primary-700 mb-6">
                If you're unsure which cause to support, you can make a general donation. 
                We'll allocate your contribution to where it's needed most at the moment.
              </p>
              <Link to="/donate" className="btn-primary">
                Make a General Donation
              </Link>
            </div>
            <div className="md:w-1/3">
              <img 
                src="https://images.pexels.com/photos/6646882/pexels-photo-6646882.jpeg" 
                alt="Help" 
                className="rounded-lg w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CausesPage