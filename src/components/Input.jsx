import React,{useId, forwardRef} from 'react'

/*weve created a button component which we're using in the form as a part of the input component, but
the state of the input data will be entered in this component, hence we used a forwardRef
hook to connect this state and component */
const Input= forwardRef(function Input({
    label,
    type='text',
    className="",
    required=false,
    ...props
}, ref){
    const id = useId();
  return (
    <div className='w-full'>
        {label && <label 
            className='inline-block mb-1 pl-1 font-poppins text-[1.09rem] text-black ' 
            htmlFor={id}>
                {label}{required && <span className="text-red-500 ml-1">*</span>}
            </label>
        }
        <input
        type={type}
        className={`bg-lightBlue px-3 py-2 rounded-lg  text-black outline-none focus:bg-gray-50 duration-200 border 
            border-gray-200 w-full ${className}`}
            ref={ref}
            {...props}
            id={id}
        />
        </div>
  )
})

export default Input