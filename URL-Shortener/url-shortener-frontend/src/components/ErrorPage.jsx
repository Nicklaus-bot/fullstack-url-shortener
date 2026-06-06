import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
// Using Framer Motion for a smooth modal-like entrance
import { motion } from 'motion/react';

/**
 * ErrorPage Component
 * Displays a polished, animated error screen with a customizable message.
 * Provides a fallback action to return the user to the home page.
 *
 * @param {Object} props - The component properties.
 * @param {string} [props.message] - Optional specific error message to display.
 * @returns {JSX.Element}
 */
const ErrorPage = ({ message }) => {
  const navigate = useNavigate();

  return (
    // Outer container: Centers the error card perfectly on the screen
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6 font-sans">
      
      {/* Animated Error Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="bg-white p-8 md:p-12 rounded-4xl shadow-xl shadow-slate-200/50 border border-slate-100 max-w-lg w-full text-center"
      >
        {/* Icon Container: Soft red background to indicate an error without being visually harsh */}
        <div className="w-24 h-24 bg-red-50 rounded-4xl flex items-center justify-center mx-auto mb-8 border border-red-100 rotate-3">
          <FaExclamationTriangle className="text-5xl text-red-500" />
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
          Oops! Something went wrong.
        </h1>

        {/* Dynamic Error Message */}
        <p className="text-slate-600 text-lg mb-10 leading-relaxed">
          {message ? message : "An unexpected error has occurred. Please try again later."}
        </p>

        {/* Action Button: Routes back to root */}
        <button 
          onClick={() => navigate("/")}
          className="
            w-full sm:w-auto 
            px-10 py-4 
            bg-blue-600 hover:bg-blue-700 
            text-white font-bold text-lg 
            rounded-full 
            shadow-lg shadow-blue-500/30 
            transition-all duration-300 
            hover:-translate-y-1
          "
        >
          Go Back Home
        </button>
      </motion.div>

    </div>
  );
};

export default ErrorPage;