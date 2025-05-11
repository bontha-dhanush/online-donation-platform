import { useState } from 'react'
import { FiSearch, FiDownload, FiExternalLink } from 'react-icons/fi'

// Sample donation history data
const donations = [
  {
    id: 'TXN123456',
    date: '2023-09-15',
    amount: 1000,
    cause: 'Education for Underprivileged Children',
    status: 'completed'
  },
  {
    id: 'TXN789012',
    date: '2023-08-22',
    amount: 500,
    cause: 'COVID-19 Relief for Rural Communities',
    status: 'completed'
  },
  {
    id: 'TXN345678',
    date: '2023-07-10',
    amount: 2000,
    cause: 'Clean Water Initiative',
    status: 'completed'
  },
  {
    id: 'TXN901234',
    date: '2023-06-05',
    amount: 750,
    cause: 'Women Empowerment through Skill Training',
    status: 'completed'
  }
]

function DonationHistory() {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredDonations = donations.filter(donation => 
    donation.cause.toLowerCase().includes(searchTerm.toLowerCase()) ||
    donation.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(dateString).toLocaleDateString('en-IN', options)
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Donation History</h2>
      
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by cause or transaction ID"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cause
              </th>
              <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="py-3 px-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredDonations.length > 0 ? (
              filteredDonations.map((donation) => (
                <tr key={donation.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 text-sm text-gray-500">{donation.id}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{formatDate(donation.date)}</td>
                  <td className="px-4 py-4 text-sm font-medium text-gray-900">₹{donation.amount}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{donation.cause}</td>
                  <td className="px-4 py-4 text-sm">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {donation.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-right">
                    <button className="text-primary-600 hover:text-primary-900 mr-3" title="Download Receipt">
                      <FiDownload />
                    </button>
                    <button className="text-primary-600 hover:text-primary-900" title="View Details">
                      <FiExternalLink />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-4 py-8 text-center text-gray-500">
                  No donations found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-8 bg-primary-50 p-4 rounded-lg">
        <h3 className="font-medium text-primary-700 mb-2">Your Impact</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-primary-600">₹{
              donations.reduce((total, donation) => total + donation.amount, 0).toLocaleString()
            }</div>
            <div className="text-sm text-gray-600">Total Donated</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-primary-600">{donations.length}</div>
            <div className="text-sm text-gray-600">Donations Made</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-primary-600">{
              [...new Set(donations.map(d => d.cause))].length
            }</div>
            <div className="text-sm text-gray-600">Causes Supported</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DonationHistory