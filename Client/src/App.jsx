import React from "react";
import Navbar from "./components/Navbar";

import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import OurTeam from "./components/Ourteam";

import NoPage from "./components/NoPage";

import Header from "./components/Header";
import Count from "./components/Count";
import Aboutus from "./components/Aboutus";

import Footer from "./components/Footer";

import { Routes, Route } from "react-router-dom";
import Card from "./components/Card";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Count />
              <Aboutus />
              <Footer />
            </>
          }
        />

        <Route path="/hero" element={<Hero />} />
        <Route path="/header" element={<Header />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/ourteam" element={<OurTeam />} />

        <Route path="/footer" element={<Footer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/card" element={<Card />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
};

export default App;
