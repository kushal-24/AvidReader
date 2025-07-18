import React from 'react'
import img from '../assets/img.svg'

const Logo = ({width='100px', className=" "}) => {
  return (
    <div><img src={img} className={` rounded-full ${className}`}></img></div>
  )
}

export default Logo