import {
  Controller,
  Post,
  Delete,
  Body
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
  addIngredient(@Body() body: { ingredient: iIngredient }): any {
    return this.ingredientsService.addIngredient(body.ingredient);
  }

  @Delete()
  deleteIngredient(@Body() body: { ingredientName: string }): any {
    return this.ingredientsService.deleteIngredient(body.ingredientName);
  }
}
