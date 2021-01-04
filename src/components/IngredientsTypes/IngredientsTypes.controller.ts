import {
  Controller,
  Post,
  Body
} from '@nestjs/common';
import { IngredientsTypesService } from './IngredientsTypes.service';

@Controller('ingredients-types')
export class IngredientsTypesController {
  constructor(private readonly ingredientsTypesService: IngredientsTypesService) {}

  @Post('add-ingredient-type')
  addIngredientType(@Body() body: {ingredientType: string}): Promise<boolean | Error> {
    return this.ingredientsTypesService.addIngredientType(body.ingredientType);
  }
}
