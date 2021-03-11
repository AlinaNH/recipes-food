import { inject, observer } from 'mobx-react';
import * as React from 'react';
import './RecipePage.css';
import { BiDish, BiTimeFive, BiSmile, BiFoodMenu } from 'react-icons/bi';
import { ImSpoonKnife } from 'react-icons/im';
import {
  Step,
  StepLabel,
  StepContent,
  Stepper,
  Card,
  CardContent
} from '@material-ui/core';

type RecipePageProps = {
  title: string,
  recipesStore?: any
}

type recipeType = {
  title: string,
  image: string,
  servings: number,
  minutes: number,
  source: string,
  instruction: string,
  cuisine: string,
  mealtypes: string[],
  ingredients: Array<{product: string, quantity: number, unit: string}>
};

const RecipePage: React.FunctionComponent<RecipePageProps> = ({ recipesStore }) => {
  const [recipe, setRecipe] = React.useState<recipeType>();
  const recipeTitle = localStorage.getItem('searchedTitle');

  React.useEffect(() => {
    (async () =>
      await fetch(window.location.href.split('#')[0] + 'recipes/' + recipeTitle)
        .then((response) => response.json())
        .then((result) => setRecipe(result.found))
    )();
  }, [recipe]);

  const renderIngredients = () => {
    return recipe.ingredients.map((i) => {
      const quantity = i.quantity.toString().replace(/(\.0*|(?<=(\..*))0*)$/, '');
      return (
        <div><ImSpoonKnife /> {quantity} {i.unit} {i.product}</div>
      );
    });
  };

  const renderDescription = () => {
    return recipe.instruction.split(/\s{10}/g).map((e, i) => {
      const step = e.replace(/\n/g, ' ');
      return (
        <Step key={i} expanded={true} active = {true}>
          <StepLabel>Step {i+1}</StepLabel>
          <StepContent><div>{e}</div></StepContent>
        </Step>
      );
    });
  };

  if (typeof recipe === 'object' && recipe !== null) {
    return (
      <div className='recipe-page-container'>
        <h2 className='recipe-title'>{recipe.title}</h2>
        <div className='recipe-filters'>
          <div className='recipe-filters-line'></div>
          <div><p><BiDish /></p><p>{recipe.cuisine} cuisine</p></div>
          <div><p><BiTimeFive /></p><p>{recipe.minutes} minutes</p></div>
          <div><p><BiSmile /></p><p>{recipe.servings} servings</p></div>
          <div><p><BiFoodMenu /></p><p>{recipe.mealtypes.join(', ')}</p></div>
          <div className='recipe-filters-line'></div>
        </div>
        <div className='recipe-details-container'>
          <div className='recipe-img-container'><img src={recipe.image} /></div>
          <div className='ingredients'>
            <Card>
              <CardContent>
                <div className='recipe-ingredients-container'>
                  <h4>Ingredients</h4>
                  <div>{ renderIngredients() }</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className='recipe-description-container'>
          <Card>
            <CardContent>
              <h4>Description</h4>
              <Stepper orientation="vertical">
                { renderDescription() }
              </Stepper>
            </CardContent>
          </Card>
          <div className='recipe-source-container'>
            <Card>
              <CardContent>
                <a href={recipe.source} className='recipe-source'><h6>Source Link</h6></a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  } else return <></>;
};

export default inject('recipesStore')(observer(RecipePage));
