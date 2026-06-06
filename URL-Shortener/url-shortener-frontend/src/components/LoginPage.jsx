import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import TextField from './TextField';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import toast from 'react-hot-toast';
import { useStoreContext } from '../contextApi/ContextApi';
// Using Framer Motion for a polished entrance animation
import { motion } from 'motion/react';

/**
 * LoginPage Component
 * Renders the user login form, handles authentication via API,
 * manages JWT token storage in context and localStorage, and redirects upon success.
 * Unified with the premium, rounded SaaS aesthetic.
 *
 * @returns {JSX.Element}
 */
const LoginPage = () => {
    const navigate = useNavigate();
    // Local state to manage button loading status during API call
    const [loader, setLoader] = useState(false);
    // Destructuring context to access token setter
    const { setToken } = useStoreContext();

    // Initializing react-hook-form for efficient form management and validation
    const {
        register,  
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({
        defaultValues: {
            username: "",
            password: "",
        },
        // Validate inputs immediately after user interacts with them
        mode: "onTouched",
    });

    /**
     * loginHandler
     * Async function to submit form data to the backend login endpoint.
     * Preserves all original authentication and navigation logic.
     * 
     * @param {Object} data - Form data containing username and password.
     */
    const loginHandler = async (data) => {
        setLoader(true);
        try {
            // Executing the POST request to the public login API
            const { data: response } = await api.post(
                "/api/auth/public/login",
                data
            );
            
            // preserved logic: Updating context state with new token
            setToken(response.token);
            // preserved logic: Storing token in localStorage for persistence
            localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));
            
            toast.success("Welcome Back!");
            // Clearing the form inputs
            reset();
            // Redirecting user to the main dashboard
            navigate("/dashboard");
        } catch (error) {
            console.error("Login API Error:", error);
            // Handling specific error feedback if available from API, otherwise fallback
            const errorMessage = error.response?.data?.message || "Login Failed! Please check your credentials.";
            toast.error(errorMessage);
        } finally {
            // Ensure loader stops regardless of request outcome
            setLoader(false);
        }
    };

  return (
    // Outer container ensuring full height and centered content
    <div
        className='min-h-screen bg-slate-50 flex justify-center items-center font-sans selection:bg-blue-200 selection:text-blue-900 px-4'>
        
        {/* Animated Login Card utilizing upgraded styles (rounded, shadow, border) */}
        <motion.form 
            onSubmit={handleSubmit(loginHandler)}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white sm:w-112.5 w-full shadow-2xl shadow-slate-200/50 py-10 sm:px-10 px-6 rounded-3xl border border-slate-100"
        >
            {/* Unified Gradient Header - replacing static color and serif font */}
            <h1 className="text-center font-extrabold tracking-tight text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-600 lg:text-4xl text-3xl mb-10">
                Login Here
            </h1>

            {/* Form Fields Container with standardized gap */}
            <div className="flex flex-col gap-4">
                <TextField
                    label="UserName"
                    required
                    id="username"
                    type="text"
                    message="*Username is required"
                    placeholder="Type your username"
                    register={register}
                    errors={errors}
                />

                <TextField
                    label="Password"
                    required
                    id="password"
                    type="password"
                    message="*Password is required"
                    placeholder="Type your password"
                    register={register}
                    // Custom validation: specific error if password too short
                    min={{
                        value: 6,
                        message: "*Password must be at least 6 characters"
                    }}
                    errors={errors}
                />
            </div>

            {/* Premium action button - replacing original gradient with solid brand blue */}
            <button
                disabled={loader}
                type='submit'
                className='
                    w-full py-4 mt-8
                    bg-blue-600 hover:bg-blue-700 
                    font-bold text-white text-lg 
                    rounded-full
                    shadow-lg shadow-blue-500/30
                    transition-all duration-300
                    hover:-translate-y-1
                    disabled:opacity-70 disabled:cursor-not-allowed
                '
            >
                {loader ? "Authenticating..." : "Login"}
            </button>

            {/* Footer link section optimized for modern design */}
            <p className='text-center text-slate-600 mt-10'>
                Don't have an account? 
                <Link
                    className='ml-2 font-semibold hover:text-black transition-colors'
                    to="/register">
                        <span className='text-blue-600 hover:underline'>SignUp Now</span>
                </Link>
            </p>
        </motion.form>
    </div>
  )
}

export default LoginPage