import React from 'react';
import "./Navbar.css";

function Navbar() {
  return (
    <div id='header'>
      <a className='anchor' id="home" href='/'>Home</a>
      <a className='anchor' href='/register'>Register</a>
      <a className='anchor' href='/allEvents'>View</a>
    </div>
  )
}

export default Navbar;