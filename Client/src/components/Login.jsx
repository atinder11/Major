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
      <Navbar />
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

          <button
            className="w-full py-2 bg-white border border-gray-300 text-black font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 flex items-center justify-center space-x-2"
            onClick={signupWithGoogle}
          >
            <FcGoogle className="text-xl" />
            <span>Sign In With Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
