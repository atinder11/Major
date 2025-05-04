import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

function AmazonDashboard() {
  return (
    <>
      <br />
      <div className="mt-4 flex justify-center">
        <h1 className="text-2xl flex items-center gap-2 font-bold">
          Enter The Seller ID:
        </h1>
      </div>
      <br />
      <SearchBar />

      <br />
      <br />

      <Footer />
    </>
  );
}

export default AmazonDashboard;
