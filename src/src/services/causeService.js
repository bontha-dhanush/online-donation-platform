// Mock API service for causes
// In a real app, this would make API calls to your backend

const causes = [
  {
    id: '1',
    title: 'Education for Underprivileged Children',
    description: 'Help provide quality education to underprivileged children in rural India. Your donation will support school supplies, uniforms, and teacher salaries.',
    detailedDescription: `
      Education is a fundamental right, yet millions of children in rural India lack access to quality education. This initiative aims to bridge this gap by supporting schools in underserved communities.
      
      Your donation will help provide:
      - School supplies and textbooks
      - Uniforms and shoes
      - Nutritious mid-day meals
      - Teacher training and salaries
      - Infrastructure improvements
      
      Together, we can empower the next generation through education.
    `,
    image: 'https://images.pexels.com/photos/256455/pexels-photo-256455.jpeg',
    raisedAmount: 275000,
    goalAmount: 500000,
    donorsCount: 148,
    daysLeft: 45,
    urgentNeed: false,
    category: 'education'
  },
  {
    id: '2',
    title: 'COVID-19 Relief for Rural Communities',
    description: 'Support rural communities severely affected by COVID-19. Your donation will provide food, medicine, and oxygen supplies to those in need.',
    detailedDescription: `
      The COVID-19 pandemic has disproportionately affected rural communities with limited access to healthcare. Many families have lost their livelihoods and are struggling to meet basic needs.
      
      Your contribution will help provide:
      - Emergency food rations for families
      - Medical supplies and oxygen concentrators
      - COVID-19 prevention kits
      - Support for local healthcare workers
      - Temporary isolation facilities
      
      Your generosity can save lives during this critical time.
    `,
    image: 'https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg',
    raisedAmount: 825000,
    goalAmount: 1000000,
    donorsCount: 342,
    daysLeft: 15,
    urgentNeed: true,
    category: 'healthcare'
  },
  {
    id: '3',
    title: 'Clean Water Initiative',
    description: 'Help provide clean, safe drinking water to villages without access. Your donation will fund wells, filtration systems, and hygiene education.',
    detailedDescription: `
      Access to clean water is a basic human right, yet many villages in India struggle with contaminated water sources. This leads to waterborne diseases that affect entire communities.
      
      This initiative will:
      - Install community wells and hand pumps
      - Provide household water filtration systems
      - Construct rainwater harvesting structures
      - Conduct water quality testing
      - Deliver hygiene and sanitation education
      
      Together, we can transform communities through access to clean water.
    `,
    image: 'https://images.pexels.com/photos/1327691/pexels-photo-1327691.jpeg',
    raisedAmount: 450000,
    goalAmount: 750000,
    donorsCount: 215,
    daysLeft: 30,
    urgentNeed: false,
    category: 'water'
  },
  {
    id: '4',
    title: 'Women Empowerment through Skill Training',
    description: 'Support skill development programs for women from marginalized communities, helping them achieve financial independence.',
    detailedDescription: `
      Economic empowerment is key to gender equality. This program focuses on providing women from marginalized communities with skills that can help them secure employment or start their own businesses.
      
      Your donation will support:
      - Vocational training in in-demand skills
      - Business development workshops
      - Microfinance opportunities
      - Mentorship programs
      - Childcare services during training
      
      By investing in women, we create ripple effects that benefit entire communities.
    `,
    image: 'https://images.pexels.com/photos/7551617/pexels-photo-7551617.jpeg',
    raisedAmount: 380000,
    goalAmount: 600000,
    donorsCount: 178,
    daysLeft: 60,
    urgentNeed: false,
    category: 'women'
  },
  {
    id: '5',
    title: 'Emergency Flood Relief',
    description: 'Provide immediate assistance to families affected by devastating floods. Help with food, clean water, shelter, and medical aid.',
    detailedDescription: `
      Recent floods have displaced thousands of families, destroying homes and livelihoods. These communities need urgent support to recover from this disaster.
      
      Your donation will provide:
      - Emergency shelter kits
      - Food and clean water supplies
      - Medical assistance and disease prevention
      - Clothing and essential items
      - Support for rebuilding homes
      
      Your timely help can make a crucial difference for those who have lost everything.
    `,
    image: 'https://images.pexels.com/photos/1374564/pexels-photo-1374564.jpeg',
    raisedAmount: 950000,
    goalAmount: 1200000,
    donorsCount: 489,
    daysLeft: 7,
    urgentNeed: true,
    category: 'disaster'
  },
  {
    id: '6',
    title: 'Sustainable Farming for Small Farmers',
    description: 'Help small farmers adopt sustainable farming practices that increase crop yields while protecting the environment.',
    detailedDescription: `
      Small and marginal farmers face numerous challenges from climate change to market access. This initiative supports farmers in transitioning to sustainable practices that improve their livelihoods.
      
      The program includes:
      - Training in organic farming methods
      - Distribution of drought-resistant seeds
      - Support for efficient irrigation systems
      - Market linkages for fair prices
      - Formation of farmer support groups
      
      By supporting sustainable agriculture, we can ensure food security and environmental protection.
    `,
    image: 'https://images.pexels.com/photos/2933243/pexels-photo-2933243.jpeg',
    raisedAmount: 320000,
    goalAmount: 800000,
    donorsCount: 134,
    daysLeft: 75,
    urgentNeed: false,
    category: 'environment'
  }
]

// Get all causes
export const getAllCauses = () => {
  return causes
}

// Get a single cause by ID
export const getCauseById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const cause = causes.find(cause => cause.id === id)
      if (cause) {
        resolve(cause)
      } else {
        reject(new Error('Cause not found'))
      }
    }, 300) // Simulate API delay
  })
}

// Filter causes by category
export const getCausesByCategory = (category) => {
  return causes.filter(cause => cause.category === category)
}

// Filter urgent causes
export const getUrgentCauses = () => {
  return causes.filter(cause => cause.urgentNeed)
}

// Make a donation (mock function)
export const makeDonation = (causeId, amount, donorInfo) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real app, this would send data to your backend
      resolve({
        success: true,
        transactionId: 'TXN' + Math.floor(Math.random() * 1000000),
        amount,
        causeId,
        date: new Date().toISOString()
      })
    }, 1000) // Simulate API delay
  })
}