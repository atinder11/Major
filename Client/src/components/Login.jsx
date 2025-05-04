import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Navbar from "./Navbar";

const Signup = () => {
  const [showMessage, setShowMessage] = useState(false);

  const handleSignup = () => {
    setShowMessage(true);
  };

  const signupWithGoogle = () => {
    window.open("http://localhost:6005/auth/google/callback", "_self");
  };

  return (
    <>
      
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="email"
              placeholder="Email ID"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="button"
              onClick={handleSignup}
              className="w-full py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-all duration-300"
            >
              Sign Up
            </button>
            {showMessage && (
              <p className="text-green-500 mt-2 text-center">
                Registration Successful
              </p>
            )}
          </form>

          {/* OR separator */}
          <div className="flex items-center justify-center my-4">
            <span className="border-t w-1/4 border-gray-300"></span>
            <span className="px-4 text-gray-500 font-semibold">OR</span>
            <span className="border-t w-1/4 border-gray-300"></span>
          </div>
          {/*
         
          <button
            className="w-full py-2 bg-white border border-gray-300 text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2"
            onClick={signupWithGoogle}
          >
            <FcGoogle className="text-xl" />
            <span>Sign In With Google</span>
          </button>
             */}

          <button
            className="btn bg-white text-black border-[#e5e5e5] w-full"
            onClick={signupWithGoogle}
          >
            <svg
              aria-label="Google logo"
              width="40"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path
                  fill="#34a853"
                  d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                ></path>
                <path
                  fill="#4285f4"
                  d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                ></path>
                <path
                  fill="#fbbc02"
                  d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                ></path>
                <path
                  fill="#ea4335"
                  d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                ></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
