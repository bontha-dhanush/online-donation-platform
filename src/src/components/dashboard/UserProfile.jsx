import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'
import { FiSave, FiRefreshCw } from 'react-icons/fi'

function UserProfile() {
  const { currentUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    name: currentUser.name || '',
    email: currentUser.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    taxId: '',
    notification: true
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsEditing(false)
      toast.success('Profile updated successfully')
    }, 1000)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">My Profile</h2>
        <button
          type="button"
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            isEditing
              ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              : 'bg-primary-500 text-white hover:bg-primary-600'
          }`}
          onClick={() => setIsEditing(!isEditing)}
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input"
              disabled={!isEditing}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input"
              disabled={!isEditing}
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="input"
              disabled={!isEditing}
            />
          </div>
          
          <div>
            <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-1">
              PAN Number (for tax benefits)
            </label>
            <input
              type="text"
              id="taxId"
              name="taxId"
              value={formData.taxId}
              onChange={handleInputChange}
              className="input"
              disabled={!isEditing}
            />
          </div>
        </div>
        
        <h3 className="text-lg font-medium text-gray-800 mb-4">Address Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="input"
              disabled={!isEditing}
            />
          </div>
          
          <div>
            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="input"
              disabled={!isEditing}
            />
          </div>
          
          <div>
            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="input"
              disabled={!isEditing}
            />
          </div>
          
          <div>
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
              Pincode
            </label>
            <input
              type="text"
              id="pincode"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className="input"
              disabled={!isEditing}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="notification"
              name="notification"
              checked={formData.notification}
              onChange={handleInputChange}
              className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              disabled={!isEditing}
            />
            <label htmlFor="notification" className="ml-2 block text-sm text-gray-700">
              Receive email notifications about new causes and donation updates
            </label>
          </div>
        </div>
        
        {isEditing && (
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary"
            >
              {isLoading ? (
                <>
                  <FiRefreshCw className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                <>
                  <FiSave className="mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        )}
      </form>

      <div className="mt-8 border-t border-gray-200 pt-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">Account Security</h3>
        <div className="space-y-4">
          <button className="text-primary-600 hover:text-primary-700 font-medium">
            Change Password
          </button>
          <button className="text-primary-600 hover:text-primary-700 font-medium">
            Enable Two-Factor Authentication
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserProfile