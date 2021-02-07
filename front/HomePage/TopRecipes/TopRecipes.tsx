import * as React from 'react';
import './TopRecipes.css';
import Carousel from './Carousel/Carousel';
export const TopRecipes: React.FunctionComponent = () => {
  return (
    <div className="TopRecipes">
      <div className="TopRecipes_wrapper">
        <Carousel />
      </div>
    </div>
  );
};
