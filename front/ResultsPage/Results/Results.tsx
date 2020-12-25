import { RecipesCard } from '../../HomePage/TopRecipes/RecipesCard/RecipesCard';
import * as React from 'react';
import './Results.css';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export const Results: React.FunctionComponent = () => {
  const [recipes, setRecipes] = React.useState(data);
  const card = recipes.map((e, i) => (
    <div key={i} className="cardWrapper">
      <RecipesCard />
    </div>
  ));

  const loadElement = () => {
    if ( window.innerHeight + window.scrollY > document.body.scrollHeight - 280) {
      setRecipes([...recipes, 1, 2, 3, 4]);
    }
  };

  React.useEffect(() => {
    window.addEventListener('scroll', loadElement);
    return () => {
      window.removeEventListener('scroll', loadElement);
    };
  });

  return <div className="Results">{card}</div>;
};
