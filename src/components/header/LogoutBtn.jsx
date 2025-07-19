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
    className='inline-block px-6  hover:scale-105 transition-all ease-in-out duration-300 text-black '
     onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn