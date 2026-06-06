import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
// Updated icons for a slightly more modern look
import { HiMenuAlt3 } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";
// Preserved backend logic connection
import { useStoreContext } from "../contextApi/ContextApi";
// Using motion for smooth mobile menu transition
import { motion, AnimatePresence } from "motion/react";

/**
 * Navigation links configuration array.
 * Controls which links are visible based on authentication state.
 */
const navLinks = [
  { name: "Home", path: "/", authRequired: false },
  { name: "About", path: "/about", authRequired: false },
  { name: "Dashboard", path: "/dashboard", authRequired: true },
];

/**
 * Navbar Component
 * Renders the top navigation bar, handles responsive mobile menu,
 * active link styling, and preserves authentication/logout logic.
 * Styled to match the premium, clean SaaS aesthetic.
 *
 * @returns {JSX.Element}
 */
const Navbar = () => {
  const navigate = useNavigate();
  // PRESERVED LOGIC: Accessing global authentication state
  const { token, setToken } = useStoreContext();
  // Get current pathname for active link styling
  const path = useLocation().pathname;
  // State to manage mobile side drawer visibility
  const [navbarOpen, setNavbarOpen] = useState(false);  

  /**
   * onLogOutHandler
   * PRESERVED LOGIC: Clears session data and redirects to login.
   */
  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    setNavbarOpen(false); // Close mobile menu if open
    navigate("/login");
  };

  /**
   * Helper component for main nav links to maintain consistency.
   */
  const NavLinkItem = ({ link, onClick }) => {
    const isActive = path === link.path;
    return (
      <li key={link.name}>
        <Link
          to={link.path}
          onClick={onClick}
          className={`
            relative font-medium transition-all duration-200 py-1
            ${isActive 
              ? "text-blue-600 font-semibold" 
              : "text-slate-700 hover:text-blue-600"
            }
          `}
        >
          {link.name}
          {/* Active Link Underline Indicator */}
          {isActive && (
            <motion.span 
              layoutId="navUnderline"
              className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-600 rounded-full"
            />
          )}
        </Link>
      </li>
    );
  };

  return (
    // Unified Aesthetic: Glassmorphism effect, sticky positioning, slate border
    <header className="h-20 bg-white/95 backdrop-blur-sm z-50 flex items-center sticky top-0 border-b border-slate-100 font-sans">
      <nav className="lg:px-14 sm:px-8 px-5 w-full flex justify-between items-center max-w-360 mx-auto">
        
        {/* Brand/Logo - Replacing italic with bold, modern tracking */}
        <Link to="/" className="z-50">
          <h1 className="font-extrabold text-3xl text-slate-950 tracking-tighter">
            Shortly<span className="text-blue-600">.</span>
          </h1>
        </Link>

        {/* Desktop Navigation Menu (Visible on md+ screens) */}
        <ul className="hidden md:flex md:items-center md:gap-8">
          {navLinks.map((link) => {
            // Conditional rendering based on auth token existence
            if (link.authRequired && !token) return null;
            return <NavLinkItem key={link.name} link={link} />;
          })}
        </ul>

        {/* Desktop Action Buttons (Visible on md+ screens) */}
        <div className="hidden md:flex md:items-center md:gap-4">
          {!token ? (
            // Unified Aesthetic: SignUp uses brand blue gradient/style
            <Link to="/register">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full text-sm shadow-lg shadow-blue-500/20 transition-all duration-300 hover:-translate-y-0.5">
                Get Started Free
              </button>
            </Link>
          ) : (
            // PRESERVED LOGIC: Logout triggers backend logic disconnection
            <button
              onClick={onLogOutHandler}
              className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-6 py-3 rounded-full text-sm transition-all duration-300">
              LogOut
            </button>
          )}
        </div>

        {/* Mobile Menu Toggle Button (Visible below md screens) */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="md:hidden z-50 p-2 -mr-2 flex items-center text-slate-950"
          aria-label="Toggle Menu"
        >
          {navbarOpen ? (
            <RxCross2 className="text-3xl" />
          ) : (
            <HiMenuAlt3 className="text-3xl" />
          )}
        </button>
      </nav>

      {/* Mobile Side Drawer Navigation (Slide-in from right) */}
      <AnimatePresence>
        {navbarOpen && (
          <>
            {/* Dark Overlay Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNavbarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />
            
            {/* Drawer Content Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-3/4 max-w-sm bg-white z-50 p-10 flex flex-col md:hidden shadow-2xl border-l border-slate-100"
            >
              {/* Logo placeholder in drawer */}
              <div className="mb-12">
                <h1 className="font-extrabold text-3xl text-slate-950 tracking-tighter">
                  Shortly<span className="text-blue-600">.</span>
                </h1>
              </div>

              {/* Mobile Navigation Links List */}
              <ul className="flex flex-col gap-6 mb-12">
                {navLinks.map((link) => {
                  if (link.authRequired && !token) return null;
                  return (
                    <NavLinkItem 
                      key={link.name + "mobile"} 
                      link={link} 
                      onClick={() => setNavbarOpen(false)} 
                    />
                  );
                })}
              </ul>

              {/* Mobile Action Buttons Footer */}
              <div className="mt-auto pt-8 border-t border-slate-100">
                {!token ? (
                  <Link to="/register" onClick={() => setNavbarOpen(false)}>
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-4 rounded-xl text-md transition-all duration-300">
                      Get Started Free
                    </button>
                  </Link>
                ) : (
                  // PRESERVED LOGIC connection
                  <button
                    onClick={onLogOutHandler}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold px-6 py-4 rounded-xl text-md transition-all duration-300">
                    LogOut
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;