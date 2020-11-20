import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import './UserPage.css';
import { motion } from 'framer-motion';
import { AccountNavigation } from './AccountNavigation/AccountNavigation';

const PageVariants = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

export const UserPage: React.FunctionComponent = () => (
  <motion.div
    exit="out"
    animate="in"
    initial="out"
    variants={PageVariants}
    className="UserPage"
  >
    <AccountNavigation/>
    <div>
      <Switch>
        <Route exact path="/my-account/my-profile" component={null} />
        <Route exact path="/my-account/my-recipes" component={null} />
        <Route exact path="/my-account/add-recipes" component={null} />
        <Route exact path="/my-account/settings" component={null} />
        <Route exact path="/my-account/logout" component={null} />
      </Switch>
    </div>
  </motion.div>
);
