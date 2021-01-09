import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param
} from '@nestjs/common';
import { IngredientsService } from './Ingredients.service';

interface iIngredient {
  name: string,
  unit: string[],
  type: string
};

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly ingredientsService: IngredientsService) {};

  @Post()
  addIngredient(@Body() body: { ingredient: iIngredient }) {
    return this.ingredientsService.addIngredient(body.ingredient);
  }

  @Delete()
  deleteIngredient(@Body() body: { ingredientName: string }) {
    return this.ingredientsService.deleteIngredient(body.ingredientName);
  }

  @Get()
  getIngredients() {
    return this.ingredientsService.getIngredients();
  }

  @Get(':ingredientName')
  getIngredient(@Param('ingredientName') ingredientName: string) {
    return this.ingredientsService.getIngredient(ingredientName);
  }
}
