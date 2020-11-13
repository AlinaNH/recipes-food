import * as React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { BsFillPersonCheckFill, BsFillPersonPlusFill } from 'react-icons/bs';

export const Header: React.FunctionComponent = () => (
  <div className="header-container">
    <nav className="header-nav-container">
      <ul>
        <NavLink className="nav-button" to="/signin">
          <BsFillPersonCheckFill />
          <li>SIGN IN</li>
        </NavLink>
        <NavLink className="nav-button" to="/signup">
          <BsFillPersonPlusFill />
          <li>SIGN UP</li>
        </NavLink>
      </ul>
    </nav>
  </div>
);
