import React from 'react';

/**
 * TextField Component
 * A reusable, accessible, and stylable input component designed to integrate seamlessly 
 * with react-hook-form. It handles its own error display and validation logic.
 *
 * @param {Object} props - The component props.
 * @param {string} props.label - The text displayed above the input field.
 * @param {string} props.id - The unique identifier for the input, used for the 'htmlFor' attribute and form registration.
 * @param {string} props.type - The HTML input type (e.g., 'text', 'email', 'password').
 * @param {Object} props.errors - The errors object from react-hook-form containing validation failures.
 * @param {Function} props.register - The register function from react-hook-form to connect the input to the form state.
 * @param {boolean} [props.required=false] - Indicates if the field is mandatory.
 * @param {string} [props.message] - Custom error message to display if the 'required' validation fails.
 * @param {string} [props.className] - Additional Tailwind CSS classes to apply to the label or input.
 * @param {Object|number} [props.min] - Minimum length requirement. Can be a number or an object: { value: number, message: string }.
 * @param {string} [props.value] - (Optional) Controlled value for the input, if not fully relying on react-hook-form state.
 * @param {string} [props.placeholder] - Placeholder text displayed when the input is empty.
 * @returns {JSX.Element} The rendered input field with label and error handling.
 */
const TextField = ({
    label,
    id,
    type,
    errors,
    register,
    required,
    message,
    className,
    min,
    value,
    placeholder,
  }) => {
    return (
      <div className="flex flex-col gap-1">
        {/* Label connected to the input via 'htmlFor' for accessibility */}
        <label
          htmlFor={id}
          className={`${className ? className : ""} font-semibold text-md`}  
        >
          {label}
        </label>
  
        {/* The core input element */}
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          // Dynamic styling: changes border color to red if there's an error associated with this field's ID
          className={`${
            className ? className : ""
          } px-2 py-2 border outline-none bg-transparent text-slate-700 rounded-md transition-colors duration-200 ${
            errors[id]?.message ? "border-red-500 focus:border-red-600" : "border-slate-300 focus:border-blue-500"
          }`}
          
          /* The spread operator unpacks the object returned by react-hook-form's register function.
            This attaches necessary props like onChange, onBlur, name, and refs.
            It also includes our custom validation rules.
          */
          {...register(id, {
            // 1. Required Validation
            required: { value: required, message },
            
            // 2. Minimum Length Validation
            // Handles cases where 'min' is just a number or a complex object
            minLength: min
              ? typeof min === 'object' ? min : { value: min, message: `Minimum ${min} characters required` }
              : null,
  
            // 3. Pattern (Regex) Validation based on input type
            pattern:
              type === "email"
                ? {
                    // Standard email regex
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                    message: "Please enter a valid email address",
                  }
                : type === "url"
                ? {
                    // Standard URL regex
                    value:
                      /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                    message: "Please enter a valid URL",
                  }
                : null,
          })}
        />
  
        {/* Error Message Display: Only renders if an error exists in the react-hook-form state for this ID */}
        {errors[id]?.message && (
          <p className="text-sm font-semibold text-red-600 mt-1">
            {errors[id]?.message}*
          </p>
        )}
      </div>
    );
  };
  
  export default TextField;