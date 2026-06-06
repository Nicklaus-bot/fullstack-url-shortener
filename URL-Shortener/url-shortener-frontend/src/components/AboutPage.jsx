import React from "react";
import { useNavigate } from "react-router-dom";
// Using the correct v12 import for Framer Motion
import { motion } from "motion/react";
import {
  FaLink,
  FaShareAlt,
  FaShieldAlt,
  FaChartLine,
  FaArrowRight
} from "react-icons/fa";

/**
 * Array of feature objects.
 * Updated with crisp, action-oriented copy.
 */
const features = [
  {
    icon: <FaLink className="text-blue-600 text-3xl" />,
    title: "Instant Shortening",
    desc: "Transform long, ugly URLs into clean, memorable links in milliseconds.",
    color: "bg-blue-50 border-blue-100",
  },
  {
    icon: <FaChartLine className="text-indigo-600 text-3xl" />,
    title: "Real-Time Analytics",
    desc: "Monitor your success with live data on clicks, devices, and geographic locations.",
    color: "bg-indigo-50 border-indigo-100",
  },
  {
    icon: <FaShieldAlt className="text-emerald-600 text-3xl" />,
    title: "Bank-Grade Security",
    desc: "Every link is encrypted. Protect your audience with advanced phishing protection.",
    color: "bg-emerald-50 border-emerald-100",
  },
  {
    icon: <FaShareAlt className="text-violet-600 text-3xl" />,
    title: "Seamless Sharing",
    desc: "Optimized for social media, email campaigns, and SMS marketing.",
    color: "bg-violet-50 border-violet-100",
  },
];

/**
 * Array of platform statistics.
 */
const stats = [
  { value: "10K+", label: "Active Links" },
  { value: "50M+", label: "Clicks Tracked" },
  { value: "99.9%", label: "Uptime SLA" },
  { value: "5K+", label: "Happy Creators" },
];

// --- Animation Variants ---
// These control how the elements fade and slide into view.
const fadeUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

/**
 * AboutPage Component
 * A premium, animated marketing page detailing the platform's value proposition.
 * * @returns {JSX.Element}
 */
const AboutPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 selection:text-blue-900 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 px-5 sm:px-10 lg:px-20 max-w-7xl mx-auto flex flex-col items-center text-center">
        {/* Subtle background glow effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-100 bg-blue-600/10 blur-[100px] -z-10 rounded-full pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUpVariant}
          className="max-w-4xl"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold tracking-wide mb-6 border border-blue-200">
            Welcome to Shortly
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
            Shorten Links. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600">
              Expand Your Reach.
            </span>
          </h1>
          <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The intelligent link management platform built for modern creators, 
            marketers, and businesses who want to track every click and own their audience.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate('/dashboard')}
              className="group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 py-4 rounded-full shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
            >
              Get Started Free
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2. Stats Divider */}
      <section className="border-y border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 py-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x-0 md:divide-x divide-slate-100"
          >
            {stats.map((stat, index) => (
              <motion.div key={index} variants={fadeUpVariant} className="text-center px-4">
                <h3 className="text-4xl md:text-5xl font-black text-slate-900 mb-2">
                  {stat.value}
                </h3>
                <p className="text-slate-500 font-medium tracking-wide uppercase text-sm">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section className="py-24 px-5 sm:px-10 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
            Everything you need, nothing you don't.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We stripped away the clutter to give you a blazing-fast, secure, and insightful link management experience.
          </p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-6 md:gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeUpVariant}
              className="group bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border ${feature.color}`}>
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 4. Bottom CTA Section */}
      <section className="px-5 sm:px-10 py-24 mb-10 max-w-5xl mx-auto">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariant}
          className="relative bg-slate-900 rounded-[3rem] overflow-hidden p-10 md:p-16 text-center shadow-2xl"
        >
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/20 blur-[80px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 blur-[80px] rounded-full" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Stop guessing. Start tracking.
            </h2>
            <p className="text-slate-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of marketers and creators who trust Shortly to manage their digital footprint. Takes less than 10 seconds to sign up.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-white text-slate-900 hover:bg-blue-50 font-bold text-lg px-10 py-4 rounded-full transition-colors duration-300 shadow-xl w-full sm:w-auto"
            >
              Create Your First Link
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default AboutPage;