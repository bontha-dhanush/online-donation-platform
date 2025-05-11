import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiBarChart2, FiHeart, FiUsers, FiTarget } from 'react-icons/fi'

function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-12">
      {/* Hero Section */}
      <section className="container-custom mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              About GivingHeart
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              GivingHeart was founded in 2025 with a simple mission: to connect generous donors 
              with meaningful causes across India. We believe in the power of collective giving 
              and transparent philanthropy.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/causes" className="btn-primary">
                Explore Our Causes
              </Link>
              <Link to="/contact" className="btn-outline">
                Contact Us
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9uYXRpb258ZW58MHx8MHx8fDA%3D" 
              alt="Team of volunteers" 
              className="rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission & Vision</h2>
            <p className="text-lg text-gray-600">
              Guided by our core values, we strive to create lasting change in communities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-card">
              <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-6">
                <FiHeart className="text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-gray-600">
                To create a transparent and accessible platform that connects donors with 
                causes that need support, ensuring that every contribution makes a meaningful 
                impact in the lives of those who need it most.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-card">
              <div className="w-16 h-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center mb-6">
                <FiTarget className="text-2xl" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-gray-600">
                A world where generosity is the norm, where every person has access to basic 
                necessities, and where communities are empowered to create sustainable solutions 
                to the challenges they face.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-600">
              The principles that guide everything we do.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Transparency',
                description: 'We believe in complete openness about where your donations go and how they are used.',
                icon: <FiBarChart2 className="text-primary-500 text-3xl mb-4" />
              },
              {
                title: 'Integrity',
                description: 'We operate with honesty and ethical standards in all our interactions and decisions.',
                icon: <FiHeart className="text-primary-500 text-3xl mb-4" />
              },
              {
                title: 'Inclusivity',
                description: 'We welcome donors and beneficiaries from all backgrounds, beliefs, and communities.',
                icon: <FiUsers className="text-primary-500 text-3xl mb-4" />
              },
              {
                title: 'Impact',
                description: 'We focus on measurable outcomes and sustainable solutions that create lasting change.',
                icon: <FiTarget className="text-primary-500 text-3xl mb-4" />
              }
            ].map((value, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center"
              >
                <div className="flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="bg-primary-50 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://iskcondwarka.org/wp-content/uploads/2023/06/Howcandonatingtocharitycanencourageyourhealthlevel.png" 
                alt="Our journey" 
                className="rounded-xl shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-700 mb-4">
                GivingHeart began with a simple observation: while many Indians wanted to donate to 
                worthy causes, they often lacked a transparent and convenient way to do so. We experienced this first hand when trying to help victims of the 2024 floods.
              </p>
              <p className="text-gray-700 mb-4">
                After struggling to find a reliable platform that would ensure his donation reached those 
                in need, we decided to create a solution. We assembled a team of technology experts and 
                nonprofit professionals to build GivingHeart – a platform that would make giving both simple 
                and impactful.
              </p>
              <p className="text-gray-700">
                Since our launch in 2025, we've helped channel over ₹1.5 crore to various causes across 
                India, partnering with local organizations to ensure every rupee is used effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Team</h2>
            <p className="text-lg text-gray-600">
              Meet the dedicated individuals behind GivingHeart
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Dhanush',
                role: 'Founder & CEO',
                //image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
                bio: 'Former tech executive with a passion for social impact.'
              },
              {
                name: 'Sai naveen',
                role: 'Chief Operating Officer',
                //image: 'https://images.pexels.com/photos/3848158/pexels-photo-3848158.jpeg',
                bio: 'Nonprofit leader with 12+ years of experience in the sector.'
              },
              {
                name: 'Manikanta',
                role: 'Head of Technology',
                //image: 'https://images.pexels.com/photos/837358/pexels-photo-837358.jpeg',
                bio: 'Full-stack developer dedicated to creating tech for good.'
              },
              {
                name: 'Meera Singh',
                role: 'Partnerships Director',
                //image: 'https://images.pexels.com/photos/3778680/pexels-photo-3778680.jpeg',
                bio: 'Community builder focused on creating sustainable partnerships.'
              }
            ].map((member, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-card overflow-hidden"
              >
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-5">
                  <h3 className="font-semibold text-xl">{member.name}</h3>
                  <p className="text-primary-600 mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-600 py-16 text-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Us in Making a Difference</h2>
            <p className="text-xl text-white/90 mb-8">
              Together, we can create positive change. Whether you donate, volunteer, or spread the word, 
              every action counts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/donate" className="btn bg-white text-primary-700 hover:bg-gray-100">
                Donate Now
              </Link>
              <Link to="/contact" className="btn bg-transparent border-2 border-white hover:bg-white/10">
                Get Involved
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default AboutPage