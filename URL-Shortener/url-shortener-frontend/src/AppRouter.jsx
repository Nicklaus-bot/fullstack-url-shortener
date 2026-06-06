import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ShortenUrlPage from "./components/ShortenUrlPage";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import LandingPage from "./components/LandingPage";
import AboutPage from "./components/AboutPage";
import RegisterPage from "./components/RegisterPage";
import LoginPage from "./components/LoginPage";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "./components/ErrorPage";

/**
 * AppRouter Component
 * The main routing switchboard for the application.
 * Handles the base domain routing, applying persistent layout elements (Navbar, Footer)
 * and protecting routes based on authentication state.
 *
 * @returns {JSX.Element}
 */
const AppRouter = () => {
    // 1. We need useLocation to check the current path
    // The original code tried to use 'location.pathname' without initializing the hook
    const location = useLocation();

    // 2. Hide Navbar and Footer on the redirect page to keep it clean
    // This ensures users only see the loader when being redirected
    const hideHeaderFooter = location.pathname.startsWith("/s");

    return (
        <>
            {/* Conditional Navbar rendering */}
            {!hideHeaderFooter && <Navbar />}
            
            {/* Global Toaster for notifications */}
            <Toaster position='bottom-center' toastOptions={{
                // Optional: You can style the toasts globally here to match your theme
                style: {
                    background: '#334155', // slate-700
                    color: '#fff',
                    borderRadius: '9999px', // fully rounded
                },
            }}/>
            
            <Routes>
                {/* Public Marketing Pages */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/about" element={<AboutPage />} />
                
                {/* The core redirect route for the base domain (e.g., yourdomain.com/s/xyz) */}
                <Route path="/s/:url" element={<ShortenUrlPage />} />

                {/* Authentication Pages - Protected to prevent logged-in users from seeing them */}
                <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterPage /></PrivateRoute>} />
                <Route path="/login" element={<PrivateRoute publicPage={true}><LoginPage /></PrivateRoute>} />
                
                {/* Protected Application Area - Requires user to be logged in */}
                <Route path="/dashboard" element={<PrivateRoute publicPage={false}><DashboardLayout /></PrivateRoute>} />
                
                {/* Error Handling Routes */}
                <Route path="/error" element={<ErrorPage />} />
                {/* Catch-all route for 404 Not Found */}
                <Route path="*" element={<ErrorPage message="We can't seem to find the page you're looking for."/>} />
            </Routes>
            
            {/* Conditional Footer rendering */}
            {!hideHeaderFooter && <Footer />}
        </>
    );
}

export default AppRouter;

/**
 * SubDomainRouter Component
 * A specialized router used ONLY when the application is accessed via a specific subdomain 
 * (e.g., url.yourdomain.com/xyz).
 * It strips away all UI (no Navbar, no Footer) and only handles the core redirection logic.
 *
 * @returns {JSX.Element}
 */
export const SubDomainRouter = () => {
    return (
        <Routes>
            {/* Matches anything after the slash on the subdomain and attempts to redirect */}
            <Route path="/:url" element={<ShortenUrlPage />} />
        </Routes>
    )
}