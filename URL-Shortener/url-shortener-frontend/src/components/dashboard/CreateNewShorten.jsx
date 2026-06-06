import React, { useState } from 'react'
import { useStoreContext } from '../../contextApi/ContextApi';
import { useForm } from 'react-hook-form';
import TextField from '../TextField';
import { Tooltip } from '@mui/material';
import { RxCross2 } from 'react-icons/rx';
import api from '../../api/api';
import toast from 'react-hot-toast';
import { motion } from 'motion/react'; // Ensure motion is imported if you use it for the modal entrance

/**
 * CreateNewShorten Component
 * Renders a modal/form interface for authenticated users to create a new shortened URL.
 * It handles the API request, automatic clipboard copying of the new URL, and triggers data refetching.
 *
 * @param {Object} props
 * @param {Function} props.setOpen - State setter to close the modal.
 * @param {Function} props.refetch - React Query refetch function to update the dashboard list.
 * @returns {JSX.Element}
 */
const CreateNewShorten = ({ setOpen, refetch }) => {
    const { token } = useStoreContext();
    const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  /**
   * Handles the submission of the new URL.
   * Sends the request, copies the result, and updates the UI state.
   */
  const createShortUrlHandler = async (data) => {
    setLoading(true);
    try {
        const { data: res } = await api.post("/api/url/shorten", data, {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: "Bearer " + token,
            },
          });

          // Construct the full short URL using the environment variable and the returned short code
          const shortenUrl = `${import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${res.shortUrl}`}`;
          
          // Automatically copy the new URL to the user's clipboard for convenience
          navigator.clipboard.writeText(shortenUrl).then(() => {
            toast.success("Short URL Created & Copied!", {
                position: "bottom-center",
                className: "mb-5",
                duration: 3000,
            });
          });

          // UNCOMMENTED: Tell React Query to fetch the updated list of URLs so the dashboard reflects the new addition immediately
          await refetch();
          
          reset();
          setOpen(false);
    } catch (error) {
        console.error("Error creating short URL:", error);
        toast.error("Failed to create Short URL. Please try again.");
    } finally {
        setLoading(false);
    }
  };

  return (
    // Outer container - usually this is placed inside a fixed overlay for a modal effect
    <div className="flex justify-center items-center font-sans">
      
      {/* Animated Modal Form */}
      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        onSubmit={handleSubmit(createShortUrlHandler)}
        className="relative bg-white sm:w-112.5 w-[90%] shadow-2xl shadow-slate-300/50 pt-10 pb-8 sm:px-10 px-6 rounded-3xl border border-slate-100"
      >
        
        {/* Close Button - positioned absolutely within the relative form container */}
        {!loading && (
          <Tooltip title="Close">
            <button
              type="button" // Important: prevents this button from submitting the form
              disabled={loading}
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 p-2 rounded-full hover:bg-slate-100 transition-colors"
            >
              <RxCross2 className="text-slate-500 hover:text-slate-900 text-2xl transition-colors" />
            </button>
          </Tooltip>
        )}

        <h2 className="text-center font-extrabold tracking-tight text-slate-900 sm:text-2xl text-xl mb-2">
            Create New Link
        </h2>
        <p className="text-center text-slate-500 text-sm mb-6">
            Paste your long URL below to shrink it.
        </p>

        <div className="mb-6">
          <TextField
            label="Destination URL"
            required
            id="originalUrl"
            placeholder="https://example.com/very/long/path..."
            type="url"
            message="Please enter a valid URL to shorten"
            register={register}
            errors={errors}
          />
        </div>

        <button
          className="w-full bg-blue-600 hover:bg-blue-700 font-bold text-white py-4 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:-translate-y-1 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          type="submit"
          disabled={loading}
        >
          {loading ? "Generating..." : "Shorten Link"}
        </button>

      </motion.form>
    </div>
  )
}

export default CreateNewShorten