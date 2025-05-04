import React from "react";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <div className="text-6xl text-[#f73232] mb-4">
        <FaExclamationTriangle />
      </div>
      <h1 className="text-6xl font-bold text-[#ffcf3a] mb-4">404</h1>
      <p className="text-2xl text-gray-700 mb-8">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/"
        
        className="flex items-center text-lg font-semibold text-white bg-[#0063ff] hover:bg-blue-700 py-2 px-4 rounded"
      >
        <FaHome className="mr-2" />
        Go to Homepage
      </Link>
    </div>
  );
};

export default NoPage;
