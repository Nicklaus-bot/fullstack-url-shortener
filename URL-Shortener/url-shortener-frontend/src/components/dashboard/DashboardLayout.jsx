import React, { useState } from 'react'
import Graph from './Graph'
import { useStoreContext } from '../../contextApi/ContextApi'
import { useFetchMyShortUrls, useFetchTotalClicks } from '../../hooks/useQuery'
import ShortenPopUp from './ShortenPopUp'
import { FaLink, FaPlus } from 'react-icons/fa'
import ShortenUrlList from './ShortenUrlList'
import { useNavigate } from 'react-router-dom'
import Loader from '../Loader'
// Imported for modern entrance animations
import { motion } from 'motion/react'

/**
 * DashboardLayout Component
 * The main container for the user's dashboard.
 * Displays aggregate click analytics (Graph) and the list of user-created short URLs.
 * Manages the state for the "Create New" modal.
 *
 * @returns {JSX.Element}
 */
const DashboardLayout = () => {
    const { token } = useStoreContext();
    const navigate = useNavigate();
    
    // State to control the visibility of the Create New URL modal
    const [shortenPopUp, setShortenPopUp] = useState(false);

    /**
     * Centralized error handler passed to React Query hooks.
     * Redirects to the error page if data fetching fails.
     */
    function onError() {
      navigate("/error");
    }

    // React Query Hooks: Fetching URLs and Click Stats simultaneously
    // Note: Assuming useFetchTotalClicks signature was updated in previous steps to accept dates,
    // using hardcoded dates for now based on original code, but ideally these would be dynamic states.
    const { 
        isLoading: isUrlsLoading, 
        data: myShortenUrls, 
        refetch 
    } = useFetchMyShortUrls(token, onError)
    
    const { 
        isLoading: isStatsLoading, 
        data: totalClicks 
    } = useFetchTotalClicks(token, "2026-01-01", "2026-12-31", onError)

    // Combined loading state: wait for both queries to finish before rendering the dashboard
    const isLoading = isUrlsLoading || isStatsLoading;

  return (
    // Outer container ensuring full height and utilizing the standard background
    <div className="lg:px-14 sm:px-8 px-4 min-h-screen bg-slate-50 font-sans pb-20">
        
        {isLoading ? ( 
            // Display polished loader while queries are running
            <div className="pt-32">
                <Loader />
            </div>
        ): ( 
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-[90%] max-w-7xl w-full mx-auto py-12"
        >
            
            {/* Header Area with Action Button */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-6">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-slate-500 mt-1">Track your link performance and manage your URLs.</p>
                </div>
                
                {/* Premium Primary Action Button */}
                <button
                    className='group flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-0.5'
                    onClick={() => setShortenPopUp(true)}
                >
                    <FaPlus className="transition-transform group-hover:rotate-90 duration-300" />
                    Create New Link
                </button>
            </div>

            {/* Analytics Graph Section */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 mb-10">
                <h2 className="text-xl font-bold text-slate-900 mb-6 px-2">Total Clicks Over Time</h2>
                
                <div className="h-96 relative w-full">
                    {/* Empty State for Graph */}
                    {totalClicks?.length === 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/50 rounded-2xl backdrop-blur-sm z-10">
                            <h3 className="text-slate-900 text-xl font-bold mb-2">
                                No Click Data Yet
                            </h3>
                            <p className="text-center text-slate-500 max-w-md">
                                Share your shortened links to start seeing engagement metrics and traffic patterns here.
                            </p>
                        </div>
                    )}
                    
                    {/* Ensure Graph component is ready to handle the data array format */}
                    <Graph graphData={totalClicks} />
                </div>
            </div>

            {/* Links List Section */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h2 className="text-xl font-bold text-slate-900">Your Links</h2>
                    <span className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-xs font-bold">
                        {myShortenUrls?.length || 0} Total
                    </span>
                </div>

                <div className="p-6">
                    {/* Empty State for URL List */}
                    {myShortenUrls?.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                                <FaLink className="text-blue-500 text-3xl" />
                            </div>
                            <h3 className="text-slate-900 text-xl font-bold mb-2">
                                No Links Created
                            </h3>
                            <p className="text-slate-500 mb-6 max-w-sm">
                                You haven't shortened any URLs yet. Create your first link to get started.
                            </p>
                            <button
                                onClick={() => setShortenPopUp(true)}
                                className="text-blue-600 font-semibold hover:text-blue-700"
                            >
                                + Create your first link
                            </button>
                        </div>
                    ) : (
                        // Render the list component, passing down the fetched data
                        <ShortenUrlList data={myShortenUrls} />
                    )}
                </div>
            </div>

        </motion.div>
        )}

        {/* Modal for creating a new short URL. Refetch is passed down to update the list upon creation. */}
        <ShortenPopUp
          refetch={refetch}
          open={shortenPopUp}
          setOpen={setShortenPopUp}
        />
    </div>
  )
}

export default DashboardLayout