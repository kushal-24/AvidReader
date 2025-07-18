import React, { useState } from "react";
import {LogoutBtn, Container, Logo} from '../index.js'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
//Hey Redux, give me a slice of the state so I can use it in this component.

const Header = () => {
  //We are using the useSelector hook to access the auth status from the Redux store.
  const authStatus= useSelector((state)=>state.auth.status)
  const navigate=useNavigate();

  

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    }, 
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
  },
  {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
  },
  {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
  },
  {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
  },
  ]//array of items which are to be displayed in the navigation bar;
  /*We will hide the items which are not to be shown, depending upon the status */


  return (
    <header className="p-3 fixed bg-navBlue z-10 w-full font-poppins" >
      <Container>
        <nav className="flex justify-between items-center">
          <div className="mr-4" >
            <Link to='/'>
            <Logo className="w-[50px]"/>
            </Link>
          </div>
          <ul className="flex text-xl font-poppins gap-[45px] ">
            {navItems.map((item)=>
            item.active? (
              <li key={item.name}className="hover:text hover:scale-105 transition-all ease-in-out duration-300">
                <button  
                onClick={()=>navigate(item.slug)}
                className=" items-center"
                >{item.name}
                </button>
              </li>
            ) : null
            )}
            {/*the below line means condition will execute if authStatus is true */}
            {authStatus && (
              <li>
                <LogoutBtn/>
              </li>
            )} 
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header;