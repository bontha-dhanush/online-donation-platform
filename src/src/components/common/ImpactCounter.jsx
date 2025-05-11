import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function ImpactCounter({ icon, value, label }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const end = value
    const duration = 2000
    const increment = end / (duration / 16)
    
    const timer = setInterval(() => {
      start += increment
      setCount(Math.min(Math.floor(start), end))
      
      if (start >= end) {
        clearInterval(timer)
      }
    }, 16)
    
    return () => clearInterval(timer)
  }, [value, isInView])

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num)
  }

  return (
    <motion.div 
      ref={ref}
      className="text-center p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center mb-4">{icon}</div>
      <div className="text-3xl font-bold text-gray-800 mb-2">{formatNumber(count)}</div>
      <div className="text-gray-600">{label}</div>
    </motion.div>
  )
}

export default ImpactCounter