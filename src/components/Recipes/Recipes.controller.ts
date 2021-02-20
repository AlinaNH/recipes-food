import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param
} from '@nestjs/common';
import { RecipesService } from './Recipes.service';

interface iRecipe {
  title: string,
  image: string,
  servings: number,
  minutes: number,
  source: string,
  instruction: string,
  cuisine: string,
  mealtypes: string[],
  ingredients: [{product: string, quantity: number, unit: string}]
};

@Controller('recipes')
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {};

  @Post()
  addRecipe(@Body() body: { recipe: iRecipe }) {
    return this.recipesService.addRecipe(body.recipe);
  }

  @Delete()
  deleteRecipe(@Body() body: { recipeTitle: string }) {
    return this.recipesService.deleteRecipe(body.recipeTitle);
  }

  @Get()
  getRecipes() {
    return this.recipesService.getRecipes();
  }

  @Get('/short')
  getShortRecipesData(@Param('short') short: 'short') {
    return this.recipesService.getShortRecipesData();
  }

  @Get('/titles')
  getRecipesTitles(@Param('titles') titles: 'titles') {
    return this.recipesService.getRecipesTitles();
  }

  @Get(':recipeTitle')
  getRecipe(@Param('recipeTitle') recipeTitle: string) {
    return this.recipesService.getRecipe(recipeTitle);
  }

  @Get('/bytitle/:title')
  getRecipeByTitle(@Param('title') title: string) {
    return this.recipesService.getRecipeByTitle(title);
  }

  @Get('/bytitles/:titles')
  getRecipesByTitles(@Param('titles') titles: string[]) {
    return this.recipesService.getRecipesByTitles(titles);
  }

  @Get('/byingredients/:ingredients')
  getRecipesByIngredients(@Param('ingredients') ingredients: string[]) {
    return this.recipesService.getRecipesByIngredients(ingredients);
  }

  @Get('/bymealtypes/:mealtypes')
  getRecipesByMealtypes(@Param('mealtypes') mealtypes: string[]) {
    return this.recipesService.getRecipesByMealtypes(mealtypes);
  }
}
