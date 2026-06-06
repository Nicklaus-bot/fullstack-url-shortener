import { createContext, useContext, useState, useEffect } from "react";

/**
 * ContextApi
 * The central hub for global state in the React application. 
 */
const ContextApi = createContext();

/**
 * ContextProvider Component
 * Wraps the application to provide access to the global state.
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children 
 * @returns {JSX.Element}
 */
export const ContextProvider = ({ children }) => {
    
    // 1. Initial State Initialization
    const getInitialToken = () => {
        try {
            const storedToken = localStorage.getItem("JWT_TOKEN");
            return storedToken ? JSON.parse(storedToken) : null;
        } catch (error) {
            console.error("Error parsing JWT_TOKEN from localStorage:", error);
            return null;
        }
    };

    const [token, setToken] = useState(getInitialToken);

    // 2. State Synchronization
    useEffect(() => {
        if (token) {
            localStorage.setItem("JWT_TOKEN", JSON.stringify(token));
        } else {
            localStorage.removeItem("JWT_TOKEN");
        }
    }, [token]);

    const sendData = {
        token,      
        setToken,   
    };

    return (
        <ContextApi.Provider value={sendData}>
            {children}
        </ContextApi.Provider>
    );
};

/**
 * Custom Hook: useStoreContext
 * A convenient wrapper around useContext.
 *
 * @returns {Object} The context payload { token, setToken }
 */
export const useStoreContext = () => {
    const context = useContext(ContextApi);
    
    if (context === undefined) {
        throw new Error("useStoreContext must be used within a ContextProvider");
    }
    
    return context;
};