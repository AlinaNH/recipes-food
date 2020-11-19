import * as React from 'react';
import './HomePage.css';
import { motion } from 'framer-motion';
import { SearchPanel } from './SearchPanel/SearchPanel';
import { TopRecipes } from './TopRecipes/TopRecipes';
import { DescriptionSite } from './DescriptionSite/DescriptionSite';

const PageVariants = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

export const HomePage: React.FunctionComponent = () => (
  <motion.div
    exit="out"
    animate="in"
    initial="out"
    variants={PageVariants}
    className="HomePage"
  >
    <DescriptionSite />
    <SearchPanel />
    <TopRecipes />
  </motion.div>
);
