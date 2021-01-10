import { Controller, Get } from '@nestjs/common';
import { MealTypesService } from './MealTypes.service';

@Controller('meal-types')
export class MealTypesController {
  constructor(private readonly mealTypesService: MealTypesService) {}

  @Get()
  getIngredientTypes() {
    return this.mealTypesService.getMealTypes();
  }
}
