import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param
} from '@nestjs/common';
import { IngredientsTypesService } from './IngredientsTypes.service';

@Controller('ingredients-types')
export class IngredientsTypesController {
  constructor(private readonly ingredientsTypesService: IngredientsTypesService) {}

  @Post()
  addIngredientType(@Body() body: {type: string}) {
    return this.ingredientsTypesService.addType(body.type);
  }

  @Delete()
  deleteIngredientType(@Body() body: {type: string}) {
    return this.ingredientsTypesService.deleteIngredientType(body.type);
  }

  @Get()
  getIngredientTypes() {
    return this.ingredientsTypesService.getIngredientTypes();
  }

  @Get(':type')
  getIngredientType(@Param('type') type: string) {
    return this.ingredientsTypesService.getIngredientType(type);
  }
}
