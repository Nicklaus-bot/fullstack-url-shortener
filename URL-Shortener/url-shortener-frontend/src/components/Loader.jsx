import React from 'react'
import { RotatingLines } from 'react-loader-spinner'

/**
 * Loader Component
 * A reusable, centralized loading spinner.
 * Styled to match the application's premium blue/slate SaaS aesthetic.
 * 
 * @param {Object} props - The component properties.
 * @param {string} [props.size="65"] - The height and width of the spinner in pixels.
 * @param {string} [props.color="#2563eb"] - The color of the spinner lines (defaults to brand blue).
 * @returns {JSX.Element}
 */
function Loader({ size = "65", color = "#2563eb" }) {
  return (
    // Outer container: Fills parent height and centers content perfectly.
    // Changed hardcoded h-112.5 to min-h-[400px] or h-full for better flexibility in different layouts.
    <div className="flex justify-center items-center w-full min-h-100 bg-slate-50 rounded-2xl">
        
        {/* Inner flex container for spinner and optional text (if added later) */}
        <div className="flex flex-col items-center gap-4 p-8 bg-white rounded-3xl shadow-lg shadow-slate-100 border border-slate-100">
          <RotatingLines
            visible={true}
            height={size}
            width={size}
            strokeColor={color} // UPDATED: Changed from hardcoded "red" to dynamic prop with SaaS blue default
            strokeWidth="4" // Slightly thinner stroke for a more elegant look
            animationDuration="0.75"   
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          
          {/* Subtle loading text to improve UX and match SaaS aesthetic */}
          <p className="text-slate-500 font-medium text-sm tracking-wide">
            Loading data...
          </p>
        </div>
    </div>
  )
}

export default Loader