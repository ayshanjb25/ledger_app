import React from 'react'
import "./styles.css"

const Header = () => {
    function logoutFnc(){
        alert("Logout!");
    }
  return (
    <div className='navbar'>
      <p className='logo'>Ledger.</p>
      <p className='logo link' onClick={logoutFnc}>Logout</p>
    </div>
  )
}

export default Header
