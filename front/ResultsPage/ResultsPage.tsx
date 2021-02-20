import * as React from 'react';
import { Filter } from './Filter/Filter';
import Results from './Results/Results';
import './ResultsPage.css';
import { motion } from 'framer-motion';

const PageVariants = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
  },
};

export const ResultsPage: React.FunctionComponent = () => (
  <motion.div
    exit="out"
    animate="in"
    initial="out"
    variants={PageVariants}
    className="ResultsPage"
  >
    <Results />
  </motion.div>
);
