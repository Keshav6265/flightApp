import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import { Route,Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import History from './pages/History/History'
import LoginPopup from './components/LoginPopup/LoginPopup'
import Offer from './pages/Offer/Offer'
import Verify from './components/Verify/Verify'

const App = () => {
  const [showLogin,setShowLogin]=useState(false);
  return (
    <>
    {showLogin===false?<></>:<LoginPopup  setShowLogin={setShowLogin}/>}
    <div className='app'>
      <Navbar setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/history' element={<History />} />
        <Route path='/offer' element={<Offer />} />
        <Route path='/verify' element={<Verify />} />
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
