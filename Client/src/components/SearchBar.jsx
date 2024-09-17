import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleClear = () => setQuery("");
  const handleSearch = () => {
    // Show alert message
    alert("Request has been sent");
    console.log("Searching for:", query);
  };

  return (
    <div className="flex justify-center py-4">
      <div className="relative w-full max-w-3xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter The Link ...."
          className="w-full px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        {query && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
          >
            <FaTimes className="text-gray-500" />
          </button>
        )}
        <button
          type="button"
          onClick={handleSearch}
          className="absolute inset-y-0 right-12 flex items-center pr-3"
        >
          <FaSearch className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
