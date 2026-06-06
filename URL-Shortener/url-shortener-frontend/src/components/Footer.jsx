import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

/**
 * Footer Component
 * Renders the site-wide footer with branding, dynamic copyright, and social links.
 * Styled with a deep slate background to match the premium SaaS aesthetic.
 *
 * @returns {JSX.Element}
 */
const Footer = () => {
  // Use JS to dynamically update the copyright year
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 z-40 relative border-t border-slate-800">
      <div className="container mx-auto px-6 lg:px-14">
        
        {/* Main Footer Layout: Brand on left, Navigation/Copyright in center/right on large screens */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-8 md:gap-4">
          
          {/* Section 1: Branding and Description */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-black text-white mb-2 tracking-tight">Shortly</h2>
            <p className="text-lg leading-relaxed max-w-sm">
              Simplifying link management for smarter sharing and powerful insights.
            </p>
          </div>

          {/* Section 2: Interactive Social Links */}
          <div className="flex justify-center space-x-6">
            {[
              { Icon: FaFacebook, href: "#", label: "Facebook" },
              { Icon: FaTwitter, href: "#", label: "Twitter" },
              { Icon: FaInstagram, href: "#", label: "Instagram" },
              { Icon: FaLinkedin, href: "#", label: "LinkedIn" },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-slate-400 hover:text-blue-400 transition-all duration-300 transform hover:-translate-y-1 text-2xl"
              >
                <social.Icon />
              </a>
            ))}
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="border-t border-slate-800 mt-10 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} Shortly Inc. All rights reserved. Built with passion for digital marketers.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;