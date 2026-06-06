import React from "react";
// Using the correct v12 import for Framer Motion
import { motion } from "motion/react";

/**
 * Card Component
 * A highly polished, reusable animated card for displaying features, steps, or informational snippets.
 * Integrates perfectly with the modern SaaS aesthetic of the application.
 *
 * @param {Object} props - The component properties.
 * @param {string} props.title - The main heading of the card.
 * @param {string} props.desc - The description or body text.
 * @param {React.ReactNode} [props.icon] - Optional icon to display at the top of the card.
 * @param {string} [props.colorClass="bg-slate-50 border-slate-100 text-slate-600"] - Tailwind classes for the icon container.
 * @param {number} [props.delay=0] - Optional delay (in seconds) for staggered animations in lists.
 * @returns {JSX.Element}
 */
const Card = ({ 
  title, 
  desc, 
  icon, 
  colorClass = "bg-slate-50 border-slate-100 text-slate-600",
  delay = 0 
}) => {
  return (
    <motion.div
      // Starts slightly lower and invisible
      initial={{ opacity: 0, y: 40 }}
      // Animates to full opacity and original position when scrolled into view
      whileInView={{ opacity: 1, y: 0 }}
      // Ensures the animation only plays once to avoid distracting the user
      viewport={{ once: true, margin: "-50px" }}
      // Uses a smooth spring physics curve for a more natural feel
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        delay: delay 
      }}
      className="
        group 
        bg-white 
        p-8 
        rounded-3xl 
        border border-slate-200 
        shadow-sm 
        hover:shadow-xl 
        hover:border-blue-200 
        transition-all 
        duration-300
        flex 
        flex-col 
        h-full
      "
    >
      {/* Icon Container (Only renders if an icon is passed via props) */}
      {icon && (
        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${colorClass}`}>
          {icon}
        </div>
      )}

      {/* Title with a group-hover effect to change color when the card is hovered */}
      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-slate-600 text-lg leading-relaxed grow">
        {desc}
      </p>
    </motion.div>
  );
};

export default Card;