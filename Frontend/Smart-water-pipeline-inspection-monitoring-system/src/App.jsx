import React from 'react'
import './App.css'
import Header from './Components/Common/Header'
import Footer from './Components/Common/Footer'
import Home from './Pages/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Pages/auth/Login'

function App() {
  return (
    <BrowserRouter>
          <Header/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer></Footer>
    </BrowserRouter>

  )
}

export default App
