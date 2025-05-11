import { useState } from 'react'
import { toast } from 'react-toastify'
import { FiPlus, FiTrash2, FiCheckCircle } from 'react-icons/fi'

// Sample payment methods
const savedPaymentMethods = [
  {
    id: '1',
    type: 'upi',
    name: 'PhonePe',
    value: 'john.doe@phonepe',
    isDefault: true
  },
  {
    id: '2',
    type: 'upi',
    name: 'Google Pay',
    value: 'john.doe@okicici',
    isDefault: false
  }
]

function PaymentSettings() {
  const [paymentMethods, setPaymentMethods] = useState(savedPaymentMethods)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newMethod, setNewMethod] = useState({
    type: 'upi',
    name: '',
    value: '',
    isDefault: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setNewMethod({
      ...newMethod,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleAddMethod = (e) => {
    e.preventDefault()
    
    if (!newMethod.name || !newMethod.value) {
      toast.error('Please fill all required fields')
      return
    }
    
    const updatedMethods = [...paymentMethods]
    
    // If setting as default, update other methods
    if (newMethod.isDefault) {
      updatedMethods.forEach(method => {
        method.isDefault = false
      })
    }
    
    // Add the new method
    updatedMethods.push({
      ...newMethod,
      id: Date.now().toString()
    })
    
    setPaymentMethods(updatedMethods)
    setNewMethod({
      type: 'upi',
      name: '',
      value: '',
      isDefault: false
    })
    setIsAddingNew(false)
    toast.success('Payment method added successfully')
  }

  const handleSetDefault = (id) => {
    const updatedMethods = paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    }))
    
    setPaymentMethods(updatedMethods)
    toast.success('Default payment method updated')
  }

  const handleDeleteMethod = (id) => {
    // Check if deleting default method
    const isDefault = paymentMethods.find(method => method.id === id)?.isDefault
    let updatedMethods = paymentMethods.filter(method => method.id !== id)
    
    // If deleted method was default, set a new default
    if (isDefault && updatedMethods.length > 0) {
      updatedMethods[0].isDefault = true
    }
    
    setPaymentMethods(updatedMethods)
    toast.success('Payment method removed')
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Payment Settings</h2>
      
      <h3 className="text-lg font-medium text-gray-800 mb-4">Saved Payment Methods</h3>
      
      {paymentMethods.length > 0 ? (
        <div className="space-y-4 mb-8">
          {paymentMethods.map(method => (
            <div 
              key={method.id} 
              className={`border rounded-lg p-4 ${method.isDefault ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3">
                    {method.type === 'upi' && (
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                        UPI
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{method.name}</div>
                    <div className="text-sm text-gray-600">{method.value}</div>
                  </div>
                  {method.isDefault && (
                    <div className="ml-3 text-xs font-semibold text-primary-600 bg-primary-100 px-2 py-1 rounded">
                      Default
                    </div>
                  )}
                </div>
                <div className="flex space-x-3">
                  {!method.isDefault && (
                    <button 
                      onClick={() => handleSetDefault(method.id)} 
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Set as Default
                    </button>
                  )}
                  <button 
                    onClick={() => handleDeleteMethod(method.id)} 
                    className="text-sm text-red-500 hover:text-red-700"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg mb-8">
          <p className="text-gray-500">No payment methods saved yet.</p>
        </div>
      )}
      
      {isAddingNew ? (
        <div className="border border-gray-200 rounded-lg p-4 mb-8">
          <h3 className="font-medium mb-4">Add New Payment Method</h3>
          
          <form onSubmit={handleAddMethod}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Method Type
                </label>
                <select
                  id="type"
                  name="type"
                  value={newMethod.type}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="upi">UPI</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Name/Provider
                </label>
                <select
                  id="name"
                  name="name"
                  value={newMethod.name}
                  onChange={handleInputChange}
                  className="input"
                >
                  <option value="">Select Provider</option>
                  <option value="PhonePe">PhonePe</option>
                  <option value="Paytm">Paytm</option>
                  <option value="Google Pay">Google Pay</option>
                  <option value="Other UPI App">Other UPI App</option>
                </select>
              </div>
              
              <div className="md:col-span-2">
                <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-1">
                  UPI ID
                </label>
                <input
                  type="text"
                  id="value"
                  name="value"
                  value={newMethod.value}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="yourname@upi"
                />
              </div>
            </div>
            
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="isDefault"
                name="isDefault"
                checked={newMethod.isDefault}
                onChange={handleInputChange}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="isDefault" className="ml-2 block text-sm text-gray-700">
                Set as default payment method
              </label>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary py-2"
              >
                <FiCheckCircle className="mr-2" />
                Save Method
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex items-center btn-outline mb-8"
        >
          <FiPlus className="mr-2" />
          Add Payment Method
        </button>
      )}
      
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">About Payment Security</h3>
        <p className="text-sm text-gray-600 mb-2">
          Your payment information is secured with industry-standard encryption. We never store your complete UPI details or payment card information on our servers.
        </p>
        <p className="text-sm text-gray-600">
          For any payment-related issues, please contact our support team at support@givingheart.org.
        </p>
      </div>
    </div>
  )
}

export default PaymentSettings