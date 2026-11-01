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
function App() {
  const [user,setUser] = useState({
    success:true,
    mssage:"",
    token:"",
    role:"ADMIN",
    subRole:"OPERATIONS_MANAGER"
  });

 useEffect(()=>{

  },[localStorage.getItem("token")])
  
  let location = useLocation();
  console.log(location.pathname);
  
  return (
    
    <AppContext.Provider value={{user}}>
          {!location.pathname=="/admin"&&<Header/>} 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin/login" element={<AdminLogin></AdminLogin>}/>
        <Route path="/admin" element={<AdminDashboard></AdminDashboard>}/>
      </Routes>
      {!location.pathname=="/admin" && <Footer/>}
    </AppContext.Provider>

  )
}

export default App
