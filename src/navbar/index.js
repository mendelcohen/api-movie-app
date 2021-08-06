import React from 'react';
import {
  Nav,
  NavLink,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to='/MovieApi' >
            Movie Search
          </NavLink>
          <NavLink to='/MovieRatings' >
            Movies
          </NavLink>
        </NavMenu>
      </Nav>
    </>
  )
}
export default Navbar;