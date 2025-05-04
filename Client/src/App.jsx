import React from "react";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";

import MainLayout from "./components/MainLayout";
import DashboardLayout from "./components/DashboardLayout";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import OurTeam from "./components/Ourteam";
import NoPage from "./components/NoPage";
import Count from "./components/Count";
import Aboutus from "./components/Aboutus";
import Card from "./components/Card";
import Faq from "./components/Faq";

import YoutubeAnalysis from "./pages/YoutubeAnalysis";
import AmazonSummarization from "./pages/AmazonSummarization";
import AmazonDashboard from "./pages/AmazonDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <Routes>
      {/* Main Layout */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Hero />
            <Count />
            <Aboutus />
            <Faq />
          </MainLayout>
        }
      />
      <Route
        path="/aboutus"
        element={
          <MainLayout>
            <Aboutus />
          </MainLayout>
        }
      />
      <Route
        path="/ourteam"
        element={
          <>
            <Navbar />
            <OurTeam />
            <Footer />
          </>
        }
      />
      <Route
        path="/faq"
        element={
          <MainLayout>
            <Faq />
          </MainLayout>
        }
      />
      <Route path="/footer" element={<MainLayout></MainLayout>} />
      <Route
        path="/login"
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />

      {/* Dashboard Layout */}
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/youtube"
        element={
          <DashboardLayout>
            <YoutubeAnalysis />
          </DashboardLayout>
        }
      />
      <Route
        path="/amazonsumm"
        element={
          <DashboardLayout>
            <AmazonSummarization />
          </DashboardLayout>
        }
      />
      <Route
        path="/amazondash"
        element={
          <DashboardLayout>
            <AmazonDashboard />
          </DashboardLayout>
        }
      />
      <Route
        path="/seller"
        element={
          <DashboardLayout>
            <SellerDashboard />
          </DashboardLayout>
        }
      />

      {/* NoPage */}
      <Route
        path="*"
        element={
          <MainLayout>
            <NoPage />
          </MainLayout>
        }
      />
    </Routes>
  );
};

export default App;
