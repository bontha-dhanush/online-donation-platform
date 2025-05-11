import { useState } from 'react'
import { Routes, Route, NavLink } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { FiUser, FiHeart, FiCreditCard, FiSettings, FiLogOut } from 'react-icons/fi'
import DonationHistory from '../components/dashboard/DonationHistory'
import UserProfile from '../components/dashboard/UserProfile'
import SavedCauses from '../components/dashboard/SavedCauses'
import PaymentSettings from '../components/dashboard/PaymentSettings'

function Dashboard() {
  const { currentUser, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')

  const tabs = [
    { id: 'profile', name: 'My Profile', icon: <FiUser />, path: '/dashboard' },
    { id: 'donations', name: 'Donation History', icon: <FiCreditCard />, path: '/dashboard/donations' },
    { id: 'saved', name: 'Saved Causes', icon: <FiHeart />, path: '/dashboard/saved' },
    { id: 'payment', name: 'Payment Settings', icon: <FiSettings />, path: '/dashboard/payment' },
  ]

  return (
    <div className="min-h-screen pt-24 pb-12 bg-gray-50">
      <div className="container-custom">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {currentUser.name}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="md:w-1/4">
            <div className="bg-white rounded-xl shadow-card overflow-hidden">
              <div className="p-6 bg-primary-500 text-white">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-white text-primary-500 flex items-center justify-center text-2xl font-bold">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="font-semibold text-xl">{currentUser.name}</h2>
                    <p className="text-primary-100">{currentUser.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-2">
                  {tabs.map(tab => (
                    <li key={tab.id}>
                      <NavLink
                        to={tab.path}
                        end={tab.id === 'profile'}
                        className={({ isActive }) => 
                          `flex items-center px-4 py-3 rounded-lg transition-colors ${
                            isActive 
                              ? 'bg-primary-50 text-primary-700' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`
                        }
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <span className="mr-3">{tab.icon}</span>
                        {tab.name}
                      </NavLink>
                    </li>
                  ))}
                  <li>
                    <button
                      onClick={logout}
                      className="w-full flex items-center px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <span className="mr-3"><FiLogOut /></span>
                      Sign Out
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:w-3/4 bg-white rounded-xl shadow-card p-6">
            <Routes>
              <Route path="/" element={<UserProfile />} />
              <Route path="/donations" element={<DonationHistory />} />
              <Route path="/saved" element={<SavedCauses />} />
              <Route path="/payment" element={<PaymentSettings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard