import RecipesCard from '../../HomePage/TopRecipes/RecipesCard/RecipesCard';
import * as React from 'react';
import './Results.css';
import { inject, observer } from 'mobx-react';

type resultsProps = {
  recipesStore?: any
};

const Results: React.FunctionComponent<resultsProps> = ({ recipesStore }) => {
  const recipes = recipesStore.getSearchedRecipes;
  const card = recipes.map((e, i) => (
    <div key={i} className="cardWrapper">
      <RecipesCard key={i} recipe={
        recipes[0].length ? recipes[i][0] : recipes[i]
      } />
    </div>
  ));
  return (
    <div className='resultsContainer'>
      <h5 className='recipesFound'>Recipes found: {recipes.length}</h5>
      <div className="Results">{card}</div>
    </div>
  );
};

export default inject('recipesStore')(observer(Results));
