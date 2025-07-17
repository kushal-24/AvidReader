import React from 'react'
import img from '../assets/img.svg'

const Logo = ({width='1000px'}) => {
  return (
    <div><img src={img} className='w-[50px] rounded-full'></img></div>
  )
}

export default Logo