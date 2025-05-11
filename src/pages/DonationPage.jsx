import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FiArrowRight, FiCreditCard, FiCheckCircle } from 'react-icons/fi'
import PaymentMethods from '../components/payment/PaymentMethods'
import { getCauseById } from '../services/causeService'

function DonationPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [cause, setCause] = useState(null)
  const [loading, setLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    amount: '',
    customAmount: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    anonymous: false,
    message: '',
    paymentMethod: 'upi',
    upiId: '',
  })

  // Fetch cause data if ID is provided
  useEffect(() => {
    if (id) {
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
    }
  }, [id])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  const handleAmountSelect = (amount) => {
    setFormData({
      ...formData,
      amount,
      customAmount: ''
    })
  }

  const handleCustomAmount = (e) => {
    const value = e.target.value
    if (value === '' || /^\d+$/.test(value)) {
      setFormData({
        ...formData,
        amount: '',
        customAmount: value
      })
    }
  }

  const getTotalAmount = () => {
    return formData.amount || formData.customAmount || 0
  }

  const handleNextStep = () => {
    // Validation for step 1
    if (step === 1) {
      if (!getTotalAmount()) {
        toast.error('Please select or enter a donation amount')
        return
      }
    }
    
    // Validation for step 2
    if (step === 2) {
      if (!formData.name || !formData.email || !formData.phone) {
        toast.error('Please fill in all required fields')
        return
      }
      
      if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        toast.error('Please enter a valid email address')
        return
      }
      
      if (!/^\d{10}$/.test(formData.phone)) {
        toast.error('Please enter a valid 10-digit phone number')
        return
      }
    }
    
    setStep(step + 1)
    window.scrollTo(0, 0)
  }

  const handlePreviousStep = () => {
    setStep(step - 1)
    window.scrollTo(0, 0)
  }

  const handlePayment = () => {
    if (formData.paymentMethod === 'upi' && !formData.upiId) {
      toast.error('Please enter your UPI ID')
      return
    }
    
    // In a real app, here we would process the payment
    // For this demo, we'll simulate a successful payment
    toast.info('Processing payment...')
    
    setTimeout(() => {
      navigate('/success', { 
        state: { 
          amount: getTotalAmount(),
          cause: cause?.title || 'General Donation',
          transactionId: 'TXN' + Math.floor(Math.random() * 1000000),
          date: new Date().toISOString()
        } 
      })
    }, 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-32 pb-12 flex justify-center">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Select Donation Amount</h2>
              
              {cause && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-lg">Selected Cause</h3>
                  <p className="text-primary-600 font-semibold">{cause.title}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[500, 1000, 2000, 5000].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    className={`py-3 px-4 rounded-lg border-2 transition-all ${
                      formData.amount === amount.toString()
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                    onClick={() => handleAmountSelect(amount.toString())}
                  >
                    ₹{amount}
                  </button>
                ))}
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Custom Amount (₹)
                </label>
                <input
                  type="text"
                  name="customAmount"
                  value={formData.customAmount}
                  onChange={handleCustomAmount}
                  placeholder="Enter amount"
                  className="input"
                />
              </div>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                className="btn-primary"
                onClick={handleNextStep}
              >
                Next <FiArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        )
      
      case 2:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Your Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="input"
                    required
                  />
                </div>
                
                <div>
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
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="3"
                  className="input"
                  placeholder="Share why you're donating..."
                ></textarea>
              </div>
              
              <div className="flex items-center mb-6">
                <input
                  type="checkbox"
                  id="anonymous"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="anonymous" className="ml-2 block text-sm text-gray-700">
                  Make my donation anonymous
                </label>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                className="btn-outline"
                onClick={handlePreviousStep}
              >
                Back
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={handleNextStep}
              >
                Continue to Payment <FiArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        )
      
      case 3:
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Payment</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium mb-2">Donation Summary</h3>
                <div className="flex justify-between mb-1">
                  <span>Amount:</span>
                  <span className="font-semibold">₹{getTotalAmount()}</span>
                </div>
                {cause && (
                  <div className="flex justify-between">
                    <span>Cause:</span>
                    <span>{cause.title}</span>
                  </div>
                )}
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium mb-4">Select Payment Method</h3>
                <PaymentMethods 
                  selectedMethod={formData.paymentMethod}
                  onSelectMethod={(method) => 
                    setFormData({...formData, paymentMethod: method})
                  }
                />
              </div>
              
              {formData.paymentMethod === 'upi' && (
                <div className="mb-6">
                  <label htmlFor="upiId" className="block text-sm font-medium text-gray-700 mb-1">
                    Enter UPI ID *
                  </label>
                  <input
                    type="text"
                    id="upiId"
                    name="upiId"
                    value={formData.upiId}
                    onChange={handleInputChange}
                    className="input"
                    placeholder="yourname@upi"
                    required
                  />
                  <div className="mt-2 flex gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" className="h-6" />
                    <img src="https://seeklogo.com/images/P/phonepe-logo-F47651EF8F-seeklogo.com.png" alt="PhonePe" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Paytm_Logo_%28standalone%29.svg/2560px-Paytm_Logo_%28standalone%29.svg.png" alt="Paytm" className="h-6" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Google_Pay_Logo.svg/512px-Google_Pay_Logo.svg.png" alt="Google Pay" className="h-6" />
                  </div>
                </div>
              )}
              
              <div className="mb-6">
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <FiCheckCircle className="text-green-500 mr-2" />
                  <span>Your payment information is secured with 256-bit encryption</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button
                type="button"
                className="btn-outline"
                onClick={handlePreviousStep}
              >
                Back
              </button>
              <button
                type="button"
                className="btn-success flex items-center"
                onClick={handlePayment}
              >
                <FiCreditCard className="mr-2" />
                Complete Payment ₹{getTotalAmount()}
              </button>
            </div>
          </div>
        )
      
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen pt-32 pb-12 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-card p-6 md:p-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3].map((stepNumber) => (
                <div key={stepNumber} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                      step === stepNumber
                        ? 'bg-primary-500 text-white'
                        : step > stepNumber
                        ? 'bg-success-500 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step > stepNumber ? <FiCheckCircle /> : stepNumber}
                  </div>
                  <span className="mt-2 text-sm hidden md:block">
                    {stepNumber === 1 ? 'Amount' : stepNumber === 2 ? 'Information' : 'Payment'}
                  </span>
                </div>
              ))}
            </div>
            <div className="relative">
              <div className="absolute top-0 h-1 bg-gray-200 w-full rounded-full"></div>
              <div
                className="absolute top-0 h-1 bg-primary-500 rounded-full transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {renderStepContent()}
        </div>
      </div>
    </div>
  )
}

export default DonationPage