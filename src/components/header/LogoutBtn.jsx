import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appWrite/auth'
import { logout } from '../../features/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler= ()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button
    className='inline-block px-6 py-2 duration-200
    hover: bg-blue-400 text-black rounded-full'
     >Logout</button>
  )
}

export default LogoutBtn