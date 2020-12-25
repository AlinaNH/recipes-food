import * as React from 'react';
import './NavigationLink.css';
import { NavLink } from 'react-router-dom';

export const NavigationLink = React.memo((props: any) => {
  const [activeNav, setActiveNav] = React.useState(1);
  return (
    <>
      {props.NavigationLink.map((e)=> {
        return (
          <NavLink to={`/my-account/${e.urlPath}`} key={e.id}>
            <li
              onClick={() => setActiveNav(e.id)}
              className={`Account_navigation__list 
              ${activeNav == e.id ? 'Account_navigation__list_active' : ''}`}>
              {activeNav == e.id ? e.icon.iconSelect : e.icon.iconElement}
              {e.nameLink}
            </li>
          </NavLink>
        );
      })}
    </>
  );
});
