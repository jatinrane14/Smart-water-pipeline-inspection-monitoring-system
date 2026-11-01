
import React from "react";
import "./App.css";

import Header from "./Components/Common/Header";
import Footer from "./Components/Common/Footer";

import Home from "./Pages/Home";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Complaint from "./Pages/Complaint";
import CitizenProfile from "./Pages/CitizenProfile";
import MyComplaints from "./Pages/MyComplaints";

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Citizen pages */}
        <Route path="/report-issue" element={<Complaint />} />
        <Route path="/citizen/profile" element={<CitizenProfile />} />
        <Route path="/citizen/complaints" element={<MyComplaints />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
