import * as React from 'react';
import { MdTimer } from 'react-icons/md';
import { BiDish } from 'react-icons/bi';
import './RecipesCard.css';
import { inject, observer } from 'mobx-react';
import { useHistory } from 'react-router-dom';

type RecipesCardProps = {
  recipesStore?: any,
  recipe?: any
}

const RecipesCard: React.FunctionComponent<RecipesCardProps>
= ({ recipe, recipesStore }) => {
  const history = useHistory();

  const renderRecipePage = (title: string) => {
    recipesStore.setSearchedTitle(title);
    localStorage.setItem('searchedTitle', title);
    history.push('/recipe-page');
  };

  return (
    <div
      className="RecipesCard"
      style={{
        backgroundImage: `url(${recipe.image})`,
      }}
    >
      <div className="RecipesCard_descriptions" onClick={
        () => renderRecipePage(recipe.title)
      }>
        <div className="RecipesCard_descriptions_titleTimeAndDifficult">
          <h5>{recipe.title}</h5>
          <span>
            <span><MdTimer /></span>
            <span>{recipe.minutes} minutes</span>
          </span>
          <span>
            <span><BiDish /></span>
            <span>{recipe.cuisine}</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default inject('recipesStore')(observer(RecipesCard));
