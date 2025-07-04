import React from "react";
import Container from "../container/Container.jsx";
import Logo from "../Logo.jsx";
import LogoutBtn from "./LogoutBtn.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
//Hey Redux, give me a slice of the state so I can use it in this component.
import { Navigate } from "react-router-dom";

const Header = () => {

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
    <header className="py-3 shadow bg-cyan-700 " >
      <Container>
        <nav className="flex">
          <div className="mr-4" >
            <Link to='/'>
            <logo width='70px'logo/>
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item)=>
            item.active? (
              <li key={item.name}>
                <button
                onClick={()=>navigate(item.slug)}
                className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
                >{item.name}
                </button>
              </li>
            ) : null
            )}
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