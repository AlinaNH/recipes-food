/* eslint-disable no-invalid-this */
import React from 'react';
import { observable } from 'mobx';
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


export interface UserPageNavigationProps {
 NavigationLink: Array<navigationLinksType>;
}

interface navigationLinksType {
  id: number;
  nameLink: string;
  urlPath:string;
  icon: NavIconType;
}

interface NavIconType{
    iconElement: JSX.Element;
    iconSelect: JSX.Element;
}

export default class UserPageNavigationStore {
  @observable NavigationLink: Array<navigationLinksType> = [
    { id: 1,
      nameLink: 'My profile',
      urlPath: 'my-profile',
      icon: {
        iconElement: <CgProfile className="Account_navigation__icon"/>,
        iconSelect: <IoMdContact className="Account_navigation__icon" />
      }
    },
    { id: 2,
      nameLink: 'My recipes',
      urlPath: 'my-recipes',
      icon: {
        iconElement: <GiBookmark className="Account_navigation__icon"/>,
        iconSelect: <GiBookmarklet className="Account_navigation__icon"/>
      }
    },
    { id: 3,
      nameLink: 'Add recipes',
      urlPath: 'add-recipes',
      icon: {
        iconElement: <BiBookAdd className="Account_navigation__icon"/>,
        iconSelect: <GiSpellBook className="Account_navigation__icon"/>
      }
    },
    { id: 4,
      nameLink: 'Settings',
      urlPath: 'settings',
      icon: {
        iconElement: <RiUserSettingsLine className="Account_navigation__icon"/>,
        iconSelect: <RiUserSettingsFill className="Account_navigation__icon"/>
      }
    },
    { id: 5,
      nameLink: 'Logout',
      urlPath: 'logout',
      icon: {
        iconElement: <RiLogoutBoxLine className="Account_navigation__icon"/>,
        iconSelect: <RiLogoutBoxFill className="Account_navigation__icon"/>
      }
    }
  ];
}
