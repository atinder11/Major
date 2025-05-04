import React, { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [graph, setGraph] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleClear = () => {
    setQuery("");
    setGraph(null);
    setStatistics(null);
    setSummary(null);
    setError(null);
  };

  const handleSearch = async () => {
    if (!query) {
      alert("Please enter a valid link or seller ID!");
      return;
    }

    const isSellerId = /^[A-Z0-9]{14}$/.test(query);

    setError(null);
    setGraph(null);
    setStatistics(null);
    setSummary(null);
    setLoading(true);

    try {
      if (isSellerId) {
        const response = await axios.post("http://127.0.0.1:5000/seller", {
          seller_id: query,
        });
        navigate("/seller", { state: { data: response.data } });
      } else {
        const response = await axios.post("http://127.0.0.1:5000/analyze", {
          link: query,
        });
        if (response.data.graph && response.data.statistics) {
          setGraph(response.data.graph);
          setStatistics(response.data.statistics);
        } else if (response.data.summary) {
          setSummary(response.data.summary);
        }
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error ||
          "An error occurred while processing your request."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center py-4">
      <div className="relative w-full max-w-3xl">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter the link"
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

      {loading && (
        <div className="mt-4">
          <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin"></div>
          <p className="mt-2 text-gray-600">Processing your request...</p>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {graph && (
        <div className="mt-6">
          <img
            src={graph}
            alt="Sentiment Analysis Graph"
            className="w-full max-w-3xl border border-gray-300 rounded-lg shadow-lg"
          />
        </div>
      )}

      {statistics && (
        <div className="mt-6 w-full max-w-3xl bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Statistics</h2>
          <p>
            <strong>Total Comments:</strong> {statistics.total_comments}
          </p>
          <p>
            <strong>Positive Comments:</strong>{" "}
            {statistics.positive_percentage.toFixed(2)}%
          </p>
          <p>
            <strong>Neutral Comments:</strong>{" "}
            {statistics.neutral_percentage.toFixed(2)}%
          </p>
          <p>
            <strong>Negative Comments:</strong>{" "}
            {statistics.negative_percentage.toFixed(2)}%
          </p>
          <p>
            <strong>Average Likes:</strong>{" "}
            {statistics.average_likes.toFixed(2)}
          </p>
        </div>
      )}
      {summary && (
        <div className="mt-6 w-full max-w-3xl bg-white p-4 border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold mb-4">Summary</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
