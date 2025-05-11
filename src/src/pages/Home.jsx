import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiHeart, FiUsers, FiTarget, FiAward } from 'react-icons/fi'
import FeatureCauses from '../components/causes/FeatureCauses'
import Testimonials from '../components/testimonials/Testimonials'
import ImpactCounter from '../components/common/ImpactCounter'

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-r from-teal-600 to-teal-800 text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Your small act of kindness can become<br />
                <span className="text-secondary-300">someone’s big reason to smile</span>
              </h1>
              <p className="text-lg text-gray-100 max-w-lg">
                Your generosity can change lives. Support our causes and help us 
                create a better future for those in need across India.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/donate" className="btn bg-white text-primary-700 hover:bg-gray-100">
                  Donate Now
                </Link>
                <Link to="/causes" className="btn bg-transparent border-2 border-white hover:bg-white/10">
                  Explore Causes
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-xl overflow-hidden shadow-2xl"
            >
              <img 
                src="https://img.freepik.com/free-photo/donate-sign-charity-campaign_53876-127165.jpg?semt=ais_hybrid&w=740" 
                alt="Children smiling" 
                className="w-full h-auto object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ImpactCounter 
              icon={<FiHeart className="text-4xl text-primary-500" />}
              value={10456}
              label="Donations"
            />
            <ImpactCounter 
              icon={<FiTarget className="text-4xl text-primary-500" />}
              value={436}
              label="Campaigns"
            />
            <ImpactCounter 
              icon={<FiUsers className="text-4xl text-primary-500" />}
              value={85600}
              label="Beneficiaries"
            />
            <ImpactCounter 
              icon={<FiAward className="text-4xl text-primary-500" />}
              value={142}
              label="Volunteers"
            />
          </div>
        </div>
      </section>

      {/* Featured Causes Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Causes</h2>
            <p className="text-gray-600">
              These causes need your immediate attention. Every contribution, no matter
              how small, can make a significant impact.
            </p>
          </div>
          <FeatureCauses />
          <div className="text-center mt-12">
            <Link to="/causes" className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700">
              View All Causes <FiArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-gray-600">
              Making a donation is simple and secure. Follow these easy steps to contribute to a cause you care about.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="rounded-full bg-primary-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose a Cause</h3>
              <p className="text-gray-600">
                Browse through our featured causes and select one that resonates with your values.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="rounded-full bg-primary-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Select Amount</h3>
              <p className="text-gray-600">
                Choose how much you'd like to donate. Even small amounts can make a big difference.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm">
              <div className="rounded-full bg-primary-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">
                Complete your donation using our secure UPI payment system via PhonePe or Paytm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Donors Say</h2>
            <p className="text-gray-600">
              Hear from people who have already made an impact through their donations.
            </p>
          </div>
          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-700 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Your contribution can change lives and create lasting impact. Join thousands of donors who are making a difference every day.
            </p>
            <Link to="/donate" className="btn bg-white text-primary-700 hover:bg-gray-100 px-8 py-4 text-lg">
              Donate Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home