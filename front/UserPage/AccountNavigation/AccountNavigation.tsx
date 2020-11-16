import * as React from 'react';
import './AccountNavigation.css';
import { CgProfile } from 'react-icons/cg';
import { GiBookmarklet, GiBookmark, GiSpellBook } from 'react-icons/gi';
import { BiBookAdd } from 'react-icons/bi';
import {
  RiUserSettingsLine,
  RiUserSettingsFill,
  RiLogoutBoxLine,
  RiLogoutBoxFill,
} from 'react-icons/ri';
import { IoMdContact } from 'react-icons/io';

export const AccountNavigation: React.FunctionComponent = () => {
  const [activeNav, setActiveNav] = React.useState('MyProfile');

  //   all li add in array with object like
  //   {id:num , nameNav:str , icon:{iconElement:<>,iconSelect:<>}}

  const selectNavigationHandler = (e:string) => {
    setActiveNav(e);
  };

  return (
    <div style={{ background: 'url(https://i.pinimg.com/564x/4f/a8/5a/4fa85a38f8a5e7a3f209d99b884417a5.jpg)' }} className="Account_wrapper">
      <ul className="Account_navigation">
        <li
          onClick={(e) => selectNavigationHandler('MyProfile')}
          className={`Account_navigation__list 
          ${activeNav == 'MyProfile' ? 'Account_navigation__list_active' : ''}`}
        >
          {activeNav == 'MyProfile' ? (
            <IoMdContact className="Account_navigation__icon" />
          ) : (
            <CgProfile className="Account_navigation__icon" />
          )}
          My profile
        </li>
        <li
          onClick={(e) => selectNavigationHandler('MyRecipes')}
          className={`Account_navigation__list 
          ${activeNav == 'MyRecipes' ? 'Account_navigation__list_active' : ''}`}
        >
          {activeNav == 'MyRecipes' ? (
            <GiBookmarklet className="Account_navigation__icon" />
          ) : (
            <GiBookmark className="Account_navigation__icon" />
          )}
          My recipes
        </li>
        <li
          onClick={(e) => selectNavigationHandler('AddRecipes')}
          className={`Account_navigation__list
           ${activeNav == 'AddRecipes' ? 'Account_navigation__list_active' : ''}`}
        >
          {activeNav == 'AddRecipes' ? (
            <GiSpellBook className="Account_navigation__icon" />
          ) : (
            <BiBookAdd className="Account_navigation__icon" />
          )}
          Add recipes
        </li>
        <li
          onClick={(e) => selectNavigationHandler('Settings')}
          className={`Account_navigation__list 
          ${activeNav == 'Settings' ? 'Account_navigation__list_active' : ''}`}
        >
          {activeNav == 'Settings' ? (
            <RiUserSettingsFill className="Account_navigation__icon" />
          ) : (
            <RiUserSettingsLine className="Account_navigation__icon" />
          )}
          Settings
        </li>
        <li
          onClick={(e) => selectNavigationHandler('Logout')}
          className={`Account_navigation__list 
          ${activeNav == 'Logout' ? 'Account_navigation__list_active' : ''}`}
        >
          {activeNav == 'Logout' ? (
            <RiLogoutBoxFill className="Account_navigation__icon" />
          ) : (
            <RiLogoutBoxLine className="Account_navigation__icon" />
          )}
          Logout
        </li>
      </ul>
    </div>
  );
};
