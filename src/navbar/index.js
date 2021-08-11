import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  // Nav,
  NavLink,
  NavBtn,
  // NavBtnLink,
  // NavMenu,
} from './NavbarElements';

const Navbar = (props) => {
  const history = useHistory()

  function handleExit() {
    history.push('/')
    props.setShowNav(sessionStorage.clear())
  }

  if (!props.showNav) {
    return (
      <nav className="navbar">
        <NavLink to='/'>
          Home
        </NavLink>
      </nav>
    )
  } else {
    return (
      <nav className="navbar">
      <NavLink to='/MovieApi'>
        Movie Search
      </NavLink>
  
      <NavLink to='/MovieRatings' >
        Movies
      </NavLink>
    
      <NavBtn >
      <button className="nav-button" onClick={handleExit} >Exit
      </button>
      </NavBtn>
    </nav>
    )
    
  }
    
}
export default Navbar;