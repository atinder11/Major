import React from "react";
import Headers from "./Header";

import Footer from "./Footer";
import Card from "./Card";

const Dashboard = () => {
  return (
    <>
      <Headers />
      <br />
      <br/>
      <h1 className="text-center font-bold text-[#080808] text-4xl">
        Welcome Back To 
        <span className="text-center font-bold text-[#ffcf3a] text-4xl">
           Dashboard
        </span>
      </h1>

      <Card />

      <br />
      <br />
      <br />

      <Footer />
    </>
  );
};

export default Dashboard;
