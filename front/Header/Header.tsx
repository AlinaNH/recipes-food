import * as React from 'react';
import './Header.css';
import { NavLink } from 'react-router-dom';
import { BsFillPersonCheckFill, BsFillPersonPlusFill } from 'react-icons/bs';
import { BiDish } from 'react-icons/bi';
import { ImSpoonKnife } from 'react-icons/im';
import { RiHome5Line } from 'react-icons/ri';

export const Header: React.FunctionComponent = () => (
  <div className="header-container">
    <ul>
      {/* <NavLink className="nav-button" to="/admin-workspace">
        <li>Admin Workspace</li>
      </NavLink> */}
      <NavLink className="nav-button" to="/">
        <RiHome5Line />
        <li>HOME PAGE</li>
      </NavLink>
      <NavLink className="nav-button" to="/admin-workspace/recipes-table">
        <BiDish />
        <li>ADD RECIPES</li>
      </NavLink>
      <NavLink className="nav-button" to="/admin-workspace/products-table">
        <ImSpoonKnife />
        <li>ADD INGREDIENTS</li>
      </NavLink>
    </ul>
    <ul>
      <NavLink className="nav-button disabled" to="/signin">
        <BsFillPersonCheckFill />
        <li>SIGN IN</li>
      </NavLink>
      <NavLink className="nav-button disabled" to="/signup">
        <BsFillPersonPlusFill />
        <li>SIGN UP</li>
      </NavLink>
    </ul>
  </div>
);
