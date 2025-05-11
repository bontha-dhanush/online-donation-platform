import { useState } from 'react'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { FiMail, FiMapPin, FiPhone, FiSend } from 'react-icons/fi'

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill all required fields')
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.')
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen pt-32 pb-12">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or want to get involved? Reach out to us through any of these channels, 
            and we'll get back to you as soon as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-xl shadow-card text-center"
          >
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMail className="text-2xl text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-600 mb-4">For general inquiries or support</p>
            <a href="mailto:contact@givingheart.org" className="text-primary-600 font-medium">
              contact@givingheart.org
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-8 rounded-xl shadow-card text-center"
          >
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiPhone className="text-2xl text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-600 mb-4">Mon-Fri from 9:00 AM to 6:00 PM</p>
            <a href="tel:+919876543210" className="text-primary-600 font-medium">
              +91 6304115099
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-card text-center"
          >
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FiMapPin className="text-2xl text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-600 mb-4">Our office location</p>
            <address className="text-primary-600 font-medium not-italic">
              Vijayawada<br />
              AP, India 520001
            </address>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
            <p className="text-gray-600 mb-8">
              Fill out the form below, and our team will get back to you within 
              24-48 hours. We value your feedback and inquiries.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
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
                    Email Address <span className="text-red-500">*</span>
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
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="input"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="input"
                  required
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary flex items-center justify-center w-full md:w-auto"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FiSend className="mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="rounded-xl overflow-hidden shadow-lg h-96 lg:h-auto"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d497511.11463357943!2d77.14879079217994!3d12.9539599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1677574377111!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="GivingHeart Office Location"
            ></iframe>
          </motion.div>
        </div>
        
        <div className="mt-16 bg-primary-50 rounded-xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-primary-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-primary-700 mb-8">
              Find quick answers to common questions about donations, volunteering, and more.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                question: 'How can I volunteer with GivingHeart?',
                answer: 'We welcome volunteers for various activities including fundraising, digital marketing, and event management. Fill out the contact form above specifying your interest in volunteering.'
              },
              {
                question: 'Are my donations tax-deductible?',
                answer: 'Yes, all donations made to GivingHeart are eligible for tax benefits under Section 80G of the Income Tax Act. You will receive a receipt for your donation that can be used for tax purposes.'
              },
              {
                question: 'How is my donation used?',
                answer: 'At least 85% of your donation goes directly to the cause you choose. The remaining amount covers essential administrative and operational costs to ensure we can continue our work effectively.'
              },
              {
                question: 'Can I donate on behalf of someone else?',
                answer: 'Absolutely! When making a donation, you can specify that it\'s a gift or in honor of someone. We can also send a notification to the person you\'re honoring, if you provide their contact information.'
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage