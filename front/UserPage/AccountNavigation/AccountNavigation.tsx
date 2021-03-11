import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { UserPageNavigationProps } from '../../stores/UserPageNavigationStore';
import './AccountNavigation.css';
import { NavigationLink } from './NavigationLink/NavigationLink';
const br = 'url(https://i.pinimg.com/564x/4f/a8/5a/4fa85a38f8a5e7a3f209d99b884417a5.jpg)';

interface AccountNavigationProps {
  userPageNavStore?: UserPageNavigationProps;
}

export const AccountNavigation = inject('userPageNavStore')(
  observer((props: AccountNavigationProps) => {
    const store = props.userPageNavStore;
    return (
      <div className="Account_wrapper">
        <ul className="Account_navigation">
          <NavigationLink NavigationLink={store.NavigationLink} />
        </ul>
      </div>
    );
  }));
