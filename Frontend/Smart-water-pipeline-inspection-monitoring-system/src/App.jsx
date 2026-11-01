import React, { useEffect, useState } from 'react'
import './App.css'
import Header from './Components/Common/Header'
import Footer from './Components/Common/Footer'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Login from './Pages/auth/Login'
import AdminLogin from './Pages/admin/auth/AdminLogin';
import AdminDashboard from './Pages/admin/dashboard/AdminDashboard';
import { AppContext } from './Context'
import Register from './Pages/auth/Register'
import Complaint from "./Pages/Complaint";
import CitizenProfile from "./Pages/CitizenProfile";
import MyComplaints from "./Pages/MyComplaints";
import { jwtDecode } from "jwt-decode";
function App() {
  const [user,setUser] = useState(null);

 useEffect(()=>{
  if (localStorage.getItem("token") !== null) {
      const decoded = jwtDecode(localStorage.getItem("token"));
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem("token");
      } else {
        if (decoded) {
          console.log(decoded);
          setUser(decoded);
        }
      }
    }

  },[localStorage.getItem("token")])
  
  let location = useLocation();
  
  return (
    
    <AppContext.Provider value={{user,setUser}}>
          {!(location.pathname=="/admin")&&<Header/>} 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin></AdminLogin>}/>
        <Route path="/admin" element={<AdminDashboard></AdminDashboard>}/>
        <Route path="/register" element={<Register />} />

        {/* Citizen pages */}
        <Route path="/report-issue" element={<Complaint />} />
        <Route path="/citizen/profile" element={<CitizenProfile />} />
        <Route path="/citizen/complaints" element={<MyComplaints />} />
      </Routes>
      {!location.pathname=="/admin" && <Footer/>}
    </AppContext.Provider>
  );
}

export default App;
