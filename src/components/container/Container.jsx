import React from 'react'

function Container({children, className=" "}){
  return (
    <div className={`w-full h-72l max-w-7xl mx-auto ${className}`} >
        {children}
    </div>
  )
} 

export default Container