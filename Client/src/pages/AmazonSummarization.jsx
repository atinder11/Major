import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";

function AmazonSummarization() {
  return (
    <>
      <br />
      <div className="mt-4 flex justify-center">
        <h1 className="text-2xl flex items-center gap-2 font-bold">
          Enter The Product Link:
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

export default AmazonSummarization;
