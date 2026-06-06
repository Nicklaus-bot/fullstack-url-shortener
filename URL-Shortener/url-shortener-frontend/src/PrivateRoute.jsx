import { Navigate } from "react-router-dom";
import { useStoreContext } from "./contextApi/ContextApi";
import React from 'react';

/**
 * PrivateRoute Component
 * A higher-order component that acts as a gatekeeper for routes based on authentication state.
 * It prevents unauthorized access to protected areas and redirects logged-in users away from auth pages.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The child component(s) to render if access is granted.
 * @param {boolean} props.publicPage - A flag indicating if the route is intended *only* for unauthenticated users (like Login or Register).
 * @returns {JSX.Element} The requested component, or a redirection.
 */
export default function PrivateRoute({ children, publicPage }) {
    // Access the global authentication token from the Context API
    const { token } = useStoreContext();

    // SCENARIO 1: The route is a "Public Only" page (e.g., Login, Register).
    if (publicPage) {
        // If a user is already logged in (has a token), they shouldn't see the login/register pages.
        // Redirect them straight to their dashboard. Otherwise, render the page.
        return token ? <Navigate to="/dashboard" replace /> : children;
    }

    // SCENARIO 2: The route is a "Protected" page (e.g., Dashboard, Settings).
    // If a user is NOT logged in (no token), they cannot access this page.
    // Redirect them to the login page. Otherwise, render the requested page.
    // The 'replace' prop ensures the current history entry is replaced, preventing them from using the back button to return to the protected route after logging out.
    return !token ? <Navigate to="/login" replace /> : children;
}