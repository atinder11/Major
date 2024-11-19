import React, { useEffect, useState } from "react";
import "../css/Header.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Header = () => {
  const [userdata, setUserdata] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate

  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:6005/login/sucess", {
        withCredentials: true,
      });

      setUserdata(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  // logout
  const logout = () => {
    window.open("http://localhost:6005/logout", "_self");
  };

  // Function to navigate to the previous page
  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <header>
        <nav>
          <div className="left">
            <h1 className="text-3xl font-bold">
              Hi{" "}
              <span className="text-[#ffcf3a] text-4xl">
                {userdata?.displayName}
              </span>
            </h1>
          </div>
          <div className="right">
            <ul>
              <li>
                <button onClick={handleBackClick} >
                  Back
                </button>
              </li>
              {Object.keys(userdata).length > 0 ? (
                <>
                  <li>
                    <NavLink to="/dashboard">Dashboard</NavLink>
                  </li>
                  <li onClick={logout}>Logout</li>
                  <li>
                    <img
                      src={userdata?.image}
                      style={{ width: "50px", borderRadius: "50%" }}
                      alt="User"
                    />
                  </li>
                </>
              ) : (
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              )}
            </ul>
            {/* Back button */}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;
