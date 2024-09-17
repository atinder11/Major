import React, { useState } from "react";
import { FaGoogle } from "react-icons/fa";
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
              <p className="text-green-500 mt-2 text-center">Registration Successful</p>
            )}
          </form>
          <button
            className="w-full mt-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition-all duration-300 flex items-center justify-center space-x-2"
            onClick={signupWithGoogle}
          >
            <FaGoogle className="text-xl" />
            <span>Sign In With Google</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Signup;
