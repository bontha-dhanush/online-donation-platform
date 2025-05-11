import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

// Mock testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Regular Donor',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg',
    text: 'I\'ve been donating monthly for over a year now, and I\'m constantly impressed by the transparency and impact reports. It feels great to see exactly how my contributions are helping others.'
  },
  {
    id: 2,
    name: 'Rahul Patel',
    role: 'First-time Donor',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    text: 'The donation process was incredibly smooth. I was able to donate using UPI in just a few clicks. Will definitely be supporting more causes through this platform.'
  },
  {
    id: 3,
    name: 'Ananya Gupta',
    role: 'Corporate Sponsor',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    text: 'We partnered with GivingHeart for our CSR initiatives and were blown away by the impact. Their team is professional, and they made it easy for our employees to contribute to meaningful causes.'
  }
]

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    )
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute top-1/2 -left-4 -translate-y-1/2 md:-left-12">
        <button 
          onClick={handlePrev}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md text-primary-600 hover:bg-primary-50"
          aria-label="Previous testimonial"
        >
          <FiChevronLeft size={20} />
        </button>
      </div>
      
      <div className="overflow-hidden px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-card p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/4 flex flex-col items-center md:items-start">
                <img 
                  src={testimonials[currentIndex].image} 
                  alt={testimonials[currentIndex].name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-primary-100" 
                />
              </div>
              <div className="md:w-3/4">
                <div className="mb-4">
                  <svg className="text-primary-400 h-8 w-8" fill="currentColor" viewBox="0 0 32 32">
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6">{testimonials[currentIndex].text}</p>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonials[currentIndex].name}</h3>
                  <p className="text-sm text-primary-600">{testimonials[currentIndex].role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <div className="absolute top-1/2 -right-4 -translate-y-1/2 md:-right-12">
        <button 
          onClick={handleNext}
          className="w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md text-primary-600 hover:bg-primary-50"
          aria-label="Next testimonial"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
      
      <div className="flex justify-center mt-6 gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2.5 h-2.5 rounded-full ${index === currentIndex ? 'bg-primary-500' : 'bg-gray-300'}`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default Testimonials