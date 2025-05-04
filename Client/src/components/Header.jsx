import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import defaultProfile from "../assets/defaultprofile.png";
import { Link } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { FaAmazon } from "react-icons/fa";

import axios from "axios";

function Header() {
  const [userdata, setUserdata] = useState({});
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const res = await axios.get("http://localhost:6005/login/sucess", {
        withCredentials: true,
      });
      setUserdata(res.data.user);
    } catch (err) {
      console.log("error", err);
    }
  };

  const logout = () => {
    window.open("http://localhost:6005/logout", "_self");
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <div className="navbar bg-[#3B82F6] text-white  shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabindex="0" role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabindex="0"
        className="menu menu-sm dropdown-content rounded-box z-1 mt-3 w-52 p-2 shadow text-black bg-white ">
        
        <li>
        <Link to="/dashboard">
        <IoMdHome />Dashboard</Link></li>
        <li>
      <Link to="/youtube">
      <FaYoutube />Youtube</Link>

      </li>
      <li>
      <Link to="/amazon">
      <FaAmazon />Amazon</Link>

      </li>
        <li><button onClick={logout}>
        <IoIosLogOut />Logout</button></li>
      </ul>
    </div>
    
    <Link to="/dashboard" className="btn btn-ghost text-2xl">
    Hi{""}
          <span className="text-[#ffcf3a] font-bold">
            {userdata?.displayName || "Guest"}
          </span>
    
    </Link>

  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-xl font-medium">
      <li><button  onClick={handleBackClick}>Back</button></li>
      <li>
        
      <Link to="/dashboard">
      
      Dashboard</Link>

          

      </li>
      <li><button onClick={logout} >

      Logout</button></li>
    </ul>
  </div>
  <div className="navbar-end">
  <div className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <img
          alt="User profile"
          src={userdata?.picture || defaultProfile}
        />
      </div>
    </div>
    <ul
      tabIndex={0}
      className="menu menu-sm dropdown-content  rounded-box z-1 mt-3 w-52 p-2 shadow text-black bg-white "
    >
      <li>
      <Link to="/dashboard">
      <IoMdHome />Dashboard</Link>

      </li>
      <li>
      <Link to="/youtube">
      <FaYoutube />Youtube</Link>

      </li>
      <li>
      <Link to="/amazon">
      <FaAmazon />Amazon</Link>

      </li>
      
      <li>
        <button onClick={logout}>
        <IoIosLogOut />Logout</button>
      </li>
    </ul>
  </div>
</div>

</div>
    </>
   
  );
}

export default Header;
		