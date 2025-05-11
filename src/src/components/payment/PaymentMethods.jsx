import { FiCreditCard } from 'react-icons/fi'
import { SiPhonepe, SiGooglepay } from 'react-icons/si'
import { FaRupeeSign } from 'react-icons/fa'

function PaymentMethods({ selectedMethod, onSelectMethod }) {
  const methods = [
    {
      id: 'upi',
      name: 'UPI',
      icon: <FaRupeeSign className="text-lg" />,
      description: 'Pay using PhonePe, Paytm, Google Pay, etc.'
    },
    {
      id: 'phonepe',
      name: 'PhonePe',
      icon: <SiPhonepe className="text-lg" />,
      description: 'Pay directly using PhonePe'
    },
    {
      id: 'googlepay',
      name: 'Google Pay',
      icon: <SiGooglepay className="text-lg" />,
      description: 'Pay directly using Google Pay'
    },
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: <FiCreditCard className="text-lg" />,
      description: 'Pay using Credit or Debit Card'
    }
  ]

  return (
    <div className="space-y-3">
      {methods.map((method) => (
        <div
          key={method.id}
          className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
            selectedMethod === method.id
              ? 'border-primary-500 bg-primary-50'
              : 'border-gray-200 hover:border-primary-300'
          }`}
          onClick={() => onSelectMethod(method.id)}
        >
          <div className="flex items-center">
            <div className="mr-3">
              <div className={`w-5 h-5 rounded-full border ${
                selectedMethod === method.id
                  ? 'border-primary-500'
                  : 'border-gray-400'
              } flex items-center justify-center`}>
                {selectedMethod === method.id && (
                  <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="mr-2">{method.icon}</span>
                  <h3 className="font-medium">{method.name}</h3>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-1">{method.description}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default PaymentMethods