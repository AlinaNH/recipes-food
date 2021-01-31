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

  @Get(':recipeTitle')
  getREcipe(@Param('recipeTitle') recipeTitle: string) {
    return this.recipesService.getRecipe(recipeTitle);
  }
}
