import React from "react";
import { useNavigate } from "react-router-dom";
// UPDATED: Using the correct v12 import for Framer Motion as per package.json
import { motion } from "motion/react";
// UPDATED: Importing necessary icons for the upgraded Card component
import { FaBolt, FaLock, FaChartLine, FaMagic, FaArrowRight } from "react-icons/fa";

import Card from "../components/Card";
// PRESERVED: Keeping core context API usage
import { useStoreContext } from "../contextApi/ContextApi";

/**
 * Common animation transition object for consistent motion across hero elements.
 */
const heroTransition = { type: "spring", stiffness: 100, damping: 20, duration: 0.8 };

/**
 * LandingPage Component
 * A premium, animated hero section and features grid serving as the primary entry point.
 * Directs users toward link management or shortlink creation based on authentication state.
 *
 * @returns {JSX.Element}
 */
const LandingPage = () => {
  const navigate = useNavigate();
  // PRESERVED: Accessing authentication token from context
  const { token } = useStoreContext();
  
  // Debug log preserved for development
  console.log("TOKEN FROM LANDING PAGE: " + token);

  /**
   * dashBoardNavigateHandler
   * PRESERVED & IMPLEMENTED LOGIC: Determines destination based on token existence.
   */
  const handlePrimaryCTA = () => {
    // If authenticated, go to dashboard; else, direct to registration
    if (token) {
      navigate("/dashboard");
    } else {
      navigate("/register");
    }
  };

  return (
    // Outer container with subtle background glow effect
    <div className="relative min-h-screen bg-slate-50 font-sans selection:bg-blue-100 selection:text-blue-900 overflow-hidden lg:px-14 sm:px-8 px-4">
      {/* Background Decorative Gradient Glow */}
      <div className="absolute top-0 right-0 w-125 h-125 bg-blue-600/10 blur-[120px] -z-10 rounded-full pointer-events-none" />

      {/* Hero Section Container */}
      <section className="lg:flex-row flex-col lg:py-24 py-16 lg:gap-16 gap-12 flex justify-between items-center max-w-7xl mx-auto">
        
        {/* Hero Text Content Block */}
        <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={heroTransition}
            // Standardized Tailwind typography, gradient text applied
            className="font-extrabold text-slate-900 text-4xl md:text-6xl xl:text-7xl leading-tight tracking-tight mb-6"
          >
            Smarter Links. <br className="hidden xl:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              Powerful Results.
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-slate-600 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            Shortly is the modern link management platform built for creators, marketers, and businesses. Turn long, cluttered URLs into clean, tracking-ready short links in milliseconds.
          </motion.p>
          
          {/* CTA Buttons Container */}
          <div className="flex items-center flex-wrap justify-center lg:justify-start gap-4 w-full">
            <motion.button
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...heroTransition, delay: 0.5 }}
              onClick={handlePrimaryCTA}
              // Upgraded styling: gradients, shadows, and interaction
              className="
                group flex items-center justify-center gap-2 
                bg-slate-900 hover:bg-slate-800 
                w-full sm:w-52 text-white font-semibold 
                rounded-full py-4 px-8 shadow-lg shadow-slate-900/20 
                transition-all duration-300 hover:-translate-y-1
              "
            >
              Start Managing
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
            
            <motion.button
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...heroTransition, delay: 0.6 }}
              // Triggering same login logic for 'create' action
              onClick={handlePrimaryCTA}
              className="
                group flex items-center justify-center gap-2 
                border border-slate-200 bg-white hover:border-slate-300
                w-full sm:w-52 text-slate-900 font-semibold 
                rounded-full py-4 px-8 shadow-sm 
                transition-all duration-300 hover:-translate-y-1
              "
            >
              <FaBolt className="text-blue-500" />
              Quick Shorten
            </motion.button>
          </div>
        </div>
        
        {/* Hero Image Block */}
        <div className="flex-1 flex justify-center w-full relative group">
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 80, damping: 15, duration: 1, delay: 0.2 }}
            // Upgraded styling: shadows, border, and interaction on hover
            className="w-full max-w-xl object-cover rounded-3xl shadow-2xl shadow-slate-400/30 border border-white hover:rotate-1 transition-transform duration-500"
            src="/images/logo.png" // Preserved image path
            alt="Shortly Platform Interface Showcase"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="sm:pt-20 pt-10 pb-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-slate-900 font-extrabold text-3xl md:text-5xl leading-tight max-w-3xl mx-auto mb-4"
          >
            The tools you need to own your digital footprint.
          </motion.p>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Trusted by modern creators and teams at innovative companies worldwide.
          </p>
        </div>

        {/* Dynamic Features Grid utilizing upgraded, documented Card component */}
        <div className="pt-4 pb-7 grid gap-6 lg:gap-8 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
          <Card
            icon={<FaMagic className="text-3xl" />}
            colorClass="bg-blue-50 border-blue-100 text-blue-600"
            title="Instant Shortening"
            desc="Experience the ease of creating short, memorable, and trusted URLs in milliseconds. Our blazing-fast interface is optimized for speed."
            delay={0.1}
          />
          <Card
            icon={<FaChartLine className="text-3xl" />}
            colorClass="bg-indigo-50 border-indigo-100 text-indigo-600"
            title="Powerful Analytics"
            desc="Gain deep insights into your link performance. Track clicks, geographical data, and referral sources to optimize your marketing reach."
            delay={0.2}
          />
          <Card
            icon={<FaLock className="text-3xl" />}
            colorClass="bg-emerald-50 border-emerald-100 text-emerald-600"
            title="Secure Infrastructure"
            desc="Rest assured with our robust, advanced encryption and enterprise-grade uptime. Your data remains safe, secure, and always accessible."
            delay={0.3}
          />
          <Card
            icon={<FaBolt className="text-3xl" />}
            colorClass="bg-violet-50 border-violet-100 text-violet-600"
            title="API Integration"
            desc="Scale your shortlink generation. Connect Shortly to your existing workflows, apps, and platforms with our lightning-fast API."
            delay={0.4}
          />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;