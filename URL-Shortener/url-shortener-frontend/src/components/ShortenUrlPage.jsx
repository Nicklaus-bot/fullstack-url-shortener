import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// Using motion for smooth entrance animation
import { motion } from 'motion/react';
// Importing established Loader component for visual consistency
import Loader from '../components/Loader';

/**
 * ShortenUrlPage Component
 * A dedicated redirection handler page.
 * It captures the short code from the URL parameters, displays a premium loading screen,
 * and performs a client-side redirect to the backend for ultimate destination resolution.
 *
 * @returns {JSX.Element}
 */
const ShortenUrlPage = () => {
    // Extracting the dynamic 'url' (short code) parameter from the current route
    const { url } = useParams();

    /**
     * CORE LOGIC - PRESERVED
     * Handles the redirection process immediately upon component mount or parameter change.
     */
    useEffect(() => {
        if (url) {
            // preserved logic: Concatenating backend base URL with short code
            // and trigger an immediate client-side redirection.
            window.location.href = import.meta.env.VITE_BACKEND_URL + `/${url}`;
        }
    }, [url]);

  return (
    // Unified Aesthetic: Centered content with premium light background
    <div className="min-h-screen bg-slate-50 flex justify-center items-center px-4 font-sans">
        
        {/* Animated Redirecting Card utilizing established SaaS aesthetic */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white p-10 md:p-12 rounded-4xl shadow-2xl shadow-slate-200/50 border border-slate-100 max-w-lg w-full text-center"
        >
            {/* Visual feedback - using established Loader component */}
            <div className="mb-10 flex justify-center scale-90">
                <Loader minHeight="fit" size="70" />
            </div>

            {/* Premium Typography & Optimized UX Text */}
            <h1 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Redirecting safely...
            </h1>
            
            <p className="text-slate-600 text-lg leading-relaxed max-w-sm mx-auto">
                Please hold tight. We are securely processing your request and sending you to your destination.
            </p>
        </motion.div>

    </div>
  ) 
}

export default ShortenUrlPage