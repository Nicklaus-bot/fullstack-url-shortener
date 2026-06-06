import React from 'react'
import ShortenItem from './ShortenItem'
// Using framer-motion for staggering list items
import { motion } from 'motion/react'

/**
 * ShortenUrlList Component
 * Renders a list of shortened URLs using the ShortenItem component.
 * Applies a smooth stagger animation as the list mounts.
 *
 * @param {Object} props - The component properties.
 * @param {Array} props.data - An array of objects, where each object represents a shortened URL and its details.
 * @returns {JSX.Element}
 */
const ShortenUrlList = ({ data }) => {
  
  // Animation variants for the container to orchestrate staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1 // Delay between each list item animating in
      }
    }
  };

  return (
    // The container motion.div handles the staggering effect
    <motion.div 
        className='my-6 space-y-4'
        variants={containerVariants}
        initial="hidden"
        animate="visible"
    >
        {/* Map over the data array and render a ShortenItem for each entry */}
        {data.map((item) => (
            // Ensure each item has a unique key (item.id). 
            // We pass all properties of the item object as props to ShortenItem using the spread operator (...item).
            <ShortenItem key={item.id} {...item} />
        ))}
    </motion.div>
  )
}

export default ShortenUrlList