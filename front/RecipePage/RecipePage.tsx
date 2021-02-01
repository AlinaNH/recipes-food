import { inject, observer } from 'mobx-react';
import * as React from 'react';
import './RecipePage.css';

type RecipePageProps = {
  title: string,
  recipesStore?: any
}

const RecipePage: React.FunctionComponent<RecipePageProps> = ({ recipesStore }) => {
  const [recipe, setRecipe] = React.useState({});
  const recipeTitle = recipesStore.getSearchedTitle;

  React.useEffect(() => {
    fetch(window.location.href.split('#')[0] + 'recipes/' + recipeTitle)
      .then((response) => response.json())
      .then((result) => setRecipe(result.found));
  }, []);

  return (
    <div>{JSON.stringify(recipe)}</div>
  );
};

export default inject('recipesStore')(observer(RecipePage));
