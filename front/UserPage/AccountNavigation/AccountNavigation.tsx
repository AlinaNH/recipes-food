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
// import * as bg from "./bg.jpg";

export const AccountNavigation: React.FunctionComponent = () => {
  const [activeList, setActiveList] = React.useState({
    MyProfile: true,
    MyRecipes: false,
    AddRecipes: false,
    Settings: false,
    Logout: false,
  });

  const selectNavigationHandler = (e) => {
    const newActiveList = { MyProfile: true,
      MyRecipes: false,
      AddRecipes: false,
      Settings: false,
      Logout: false, };
    for (const item in activeList) {
      if (e === item) {
        newActiveList[`${item}`] = true;
      } else {
        newActiveList[`${item}`] = false;
      }
    }
    console.log(newActiveList);
    setActiveList(newActiveList);
  };
  return (
    <div style={{ background: 'url(https://i.pinimg.com/564x/4f/a8/5a/4fa85a38f8a5e7a3f209d99b884417a5.jpg)' }} className="Account_wrapper">
      <ul className="Account_navigation">
        <li
          onClick={(e) => selectNavigationHandler('MyProfile')}
          className={`Account_navigation__list 
          ${activeList.MyProfile ? 'Account_navigation__list_active' : ''}`}
        >
          {activeList.MyProfile ? (
            <IoMdContact className="Account_navigation__icon" />
          ) : (
            <CgProfile className="Account_navigation__icon" />
          )}
          My profile
        </li>
        <li
          onClick={(e) => selectNavigationHandler('MyRecipes')}
          className={`Account_navigation__list 
          ${activeList.MyRecipes ? 'Account_navigation__list_active' : ''}`}
        >
          {activeList.MyRecipes ? (
            <GiBookmarklet className="Account_navigation__icon" />
          ) : (
            <GiBookmark className="Account_navigation__icon" />
          )}
          My recipes
        </li>
        <li
          onClick={(e) => selectNavigationHandler('AddRecipes')}
          className={`Account_navigation__list
           ${activeList.AddRecipes ? 'Account_navigation__list_active' : ''}`}
        >
          {activeList.AddRecipes ? (
            <GiSpellBook className="Account_navigation__icon" />
          ) : (
            <BiBookAdd className="Account_navigation__icon" />
          )}
          Add recipes
        </li>
        <li
          onClick={(e) => selectNavigationHandler('Settings')}
          className={`Account_navigation__list 
          ${activeList.Settings ? 'Account_navigation__list_active' : ''}`}
        >
          {activeList.Settings ? (
            <RiUserSettingsFill className="Account_navigation__icon" />
          ) : (
            <RiUserSettingsLine className="Account_navigation__icon" />
          )}
          Settings
        </li>
        <li
          onClick={(e) => selectNavigationHandler('Logout')}
          className={`Account_navigation__list 
          ${activeList.Logout ? 'Account_navigation__list_active' : ''}`}
        >
          {activeList.Logout ? (
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
