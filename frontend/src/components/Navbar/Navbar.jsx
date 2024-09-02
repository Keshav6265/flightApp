import React, { useContext, useState } from 'react'
import './Navbar.css'
import {Link,useNavigate} from 'react-router-dom'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'

const Navbar = ({setShowLogin}) => {

  const [menu, setMenu] = useState("flights");
  const {token,setToken}=useContext(StoreContext)

  const navigate=useNavigate();

  const logout=()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate('/')
  }

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt='logo' className='logo' /></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={()=>setMenu('flights')} className={menu==='flights'?'active':""}>Flights</Link>
        <Link to='/history' onClick={()=>setMenu('history')} className={menu==='history'?'active':""}>Travel History</Link>
        <a href='#app-download' onClick={()=>setMenu('mobile-app')} className={menu==='mobile-app'?'active':""}>Mobile App</a>
        <a href='#footer' onClick={()=>setMenu('contact')} className={menu==='contact'?'active':""}>Contact</a>
      </ul>
      <div className='navbar-right'>
        {!token?<button onClick={()=>setShowLogin(true)}>Sign IN</button>
        :<div className='navbar-profile'>
        <img src={assets.profile_icon} alt='profile' />
        <ul className='nav-profile-dropdown'>
          <li onClick={logout}><img src={assets.logout_icon} alt='logout' />logout</li>
        </ul>
        </div>}
      </div>
    </div>
  )
}

export default Navbar
