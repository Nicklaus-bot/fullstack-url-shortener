import React from 'react'
import Modal from '@mui/material/Modal';
import CreateNewShorten from './CreateNewShorten';

/**
 * ShortenPopUp Component
 * A wrapper component that utilizes Material-UI's Modal to display the 
 * 'CreateNewShorten' form as an overlay above the current page content.
 *
 * @param {Object} props - The component properties.
 * @param {boolean} props.open - Controls the visibility of the modal.
 * @param {Function} props.setOpen - State setter function to toggle the modal's visibility.
 * @param {Function} props.refetch - React Query refetch function passed down to trigger data updates after creation.
 * @returns {JSX.Element}
 */
const ShortenPopUp = ({ open, setOpen, refetch}) => {

    /**
     * Handles the event when the user attempts to close the modal
     * (e.g., clicking the backdrop or pressing the Escape key).
     */
    const handleClose = () => {
        setOpen(false);
    };

  return (
    <Modal
        open={open}
        onClose={handleClose}
        // Accessibility attributes linking to the content inside the modal
        aria-labelledby="create-short-url-modal-title"
        aria-describedby="create-short-url-modal-description"
      >
        {/* Backdrop and positioning container.
            Uses Tailwind to center the modal content horizontally and vertically.
            Removes outline on focus to prevent ugly default browser rings.
        */}
        <div className='flex justify-center items-center h-full w-full outline-none p-4'>
            {/* The actual form component */}
            <CreateNewShorten setOpen={setOpen} refetch={refetch} />
        </div> 
      </Modal>
  )
}

export default ShortenPopUp;