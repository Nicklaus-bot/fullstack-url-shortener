import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaExternalLinkAlt, FaRegCalendarAlt } from 'react-icons/fa';
import { IoCopy } from 'react-icons/io5';
import { LiaCheckSolid } from 'react-icons/lia';
import { MdAnalytics, MdOutlineAdsClick } from 'react-icons/md';
import api from '../../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { useStoreContext } from '../../contextApi/ContextApi';
import { Hourglass } from 'react-loader-spinner';
import Graph from './Graph';
// Importing motion for smooth expanding/collapsing of analytics
import { motion, AnimatePresence } from 'motion/react';

/**
 * ShortenItem Component
 * Renders a single row representing a shortened URL, displaying its details
 * and providing actions to copy the link or view its specific analytics.
 * Styled to match the modern, clean SaaS aesthetic.
 *
 * @param {Object} props - Component properties.
 * @param {string} props.originalUrl - The long URL.
 * @param {string} props.shortUrl - The generated short code.
 * @param {number} props.clickCount - Total clicks for this URL.
 * @param {string} props.createdDate - Creation timestamp.
 * @returns {JSX.Element}
 */
const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
    const { token } = useStoreContext();
    const navigate = useNavigate();
    
    // UI States
    const [isCopied, setIsCopied] = useState(false);
    const [analyticToggle, setAnalyticToggle] = useState(false);
    const [loader, setLoader] = useState(false);
    
    // Data States
    const [selectedUrl, setSelectedUrl] = useState("");
    const [analyticsData, setAnalyticsData] = useState([]);

    // Format the subdomain for display purposes
    const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace( 
        /^https?:\/\//,
        ""
    );

    /**
     * Toggles the analytics panel and sets the selected URL to trigger data fetching
     * if the panel is being opened.
     */
    const analyticsHandler = (shortUrl) => {
        if (!analyticToggle) {
            setSelectedUrl(shortUrl);
        }
        setAnalyticToggle(!analyticToggle);
    }

    /**
     * Fetches analytics data specifically for this short URL.
     * Note: Dates are currently hardcoded; in a production app, these should 
     * probably be dynamic or passed down as context/props.
     */
    const fetchMyShortUrl = async () => {
        setLoader(true);
        try {
             const { data } = await api.get(`/api/url/analytics/${selectedUrl}?startDate=2026-01-01T00:00:00&endDate=2026-12-31T23:59:59`, {
                        headers: {
                          "Content-Type": "application/json",
                          Accept: "application/json",
                          Authorization: "Bearer " + token,
                        },
                      });
            
            // SMART PARSING
            let formattedData = [];
            if (Array.isArray(data)) {
                formattedData = data; // It's already an array!
            } else if (typeof data === 'object' && data !== null) {
                formattedData = Object.keys(data).map((key) => ({ // Convert Map to Array
                    clickDate: key,
                    count: data[key],
                }));
            }

            setAnalyticsData(formattedData);
            setSelectedUrl(""); 
            
        } catch (error) {
            navigate("/error");
            console.error("Error fetching item analytics:", error);
        } finally {
            setLoader(false);
        }
    }

    // Trigger fetch when a URL is selected for analytics
    useEffect(() => {
        if (selectedUrl) {
            fetchMyShortUrl();
        }
    }, [selectedUrl]);

    // Handle Copy state reset
    useEffect(() => {
        if (isCopied) {
            const timer = setTimeout(() => setIsCopied(false), 2000);
            return () => clearTimeout(timer);
        }
    }, [isCopied]);

  return (
    // Unified Aesthetic: Clean white card, subtle border, rounded corners
    <div className="bg-white border border-slate-200 p-6 rounded-2xl transition-shadow duration-200 hover:shadow-md">
        
        {/* Main Content Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            
            {/* Link Details Section */}
            <div className="flex-1 min-w-0"> {/* min-w-0 ensures truncation works */}
                
                {/* Short URL with Link out */}
                <div className="flex items-center gap-2 mb-2">
                    <Link
                        target='_blank'
                        rel="noopener noreferrer"
                        className='text-lg font-bold text-blue-600 hover:text-blue-800 transition-colors truncate'
                        to={import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${shortUrl}`}
                    >
                        {subDomain}/s/{shortUrl}
                    </Link>
                    <FaExternalLinkAlt className="text-slate-400 text-sm shrink-0" />
                </div>

                {/* Original URL */}
                <div className="text-slate-500 text-sm truncate mb-4">
                    {originalUrl}
                </div>

                {/* Meta Information (Clicks & Date) */}
                <div className="flex items-center gap-6 text-sm font-medium text-slate-600">
                    <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
                        <MdOutlineAdsClick className="text-lg" />
                        <span>{clickCount} {clickCount === 1 ? "Click" : "Clicks"}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <FaRegCalendarAlt className="text-slate-400" />
                        <span>{dayjs(createdDate).format("MMM DD, YYYY")}</span>
                    </div>
                </div>
            </div>

            {/* Action Buttons Section */}
            <div className="flex items-center gap-3 md:justify-end">
                <CopyToClipboard
                    onCopy={() => setIsCopied(true)}
                    text={`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`}
                >
                    <button className={`
                        flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200
                        ${isCopied 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }
                    `}>
                        {isCopied ? <LiaCheckSolid className="text-lg" /> : <IoCopy className="text-lg" />}
                        {isCopied ? "Copied!" : "Copy"}
                    </button>
                </CopyToClipboard>

                <button
                    onClick={() => analyticsHandler(shortUrl)}
                    className={`
                        flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200
                        ${analyticToggle 
                            ? 'bg-slate-800 text-white' 
                            : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                        }
                    `}
                >
                    <MdAnalytics className="text-lg" />
                    Analytics
                </button>
            </div>
        </div>

        {/* Collapsible Analytics Section */}
        <AnimatePresence>
            {analyticToggle && (
                <motion.div 
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 24 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    className="overflow-hidden border-t border-slate-100"
                >
                    <div className="pt-6 relative min-h-75">
                        {loader ? (
                            <div className="absolute inset-0 flex flex-col justify-center items-center bg-white/80 z-10">
                                <Hourglass
                                    visible={true}
                                    height="40"
                                    width="40"
                                    ariaLabel="hourglass-loading"
                                    colors={['#2563eb', '#60a5fa']} // Updated to match brand blue
                                />
                                <p className='text-slate-500 text-sm mt-3 font-medium'>Loading insights...</p>
                            </div>
                        ) : ( 
                            <>
                                {analyticsData.length === 0 && (
                                    <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-4">
                                        <h4 className="text-slate-900 font-bold text-lg mb-2">
                                            No Engagement Yet
                                        </h4>
                                        <p className="text-slate-500 text-sm max-w-sm">
                                            Share this link to start tracking clicks, geographic data, and referral sources over time.
                                        </p>
                                    </div>
                                )}
                                <div className="h-75">
                                    <Graph graphData={analyticsData} />
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
  )
}

export default ShortenItem