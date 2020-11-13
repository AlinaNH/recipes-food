import * as React from 'react';
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
  </motion.div>
);
