import { Controller, Get } from '@nestjs/common';
import { СuisinesService } from './Cuisines.service';

@Controller('cuisines')
export class CuisinesController {
  constructor(private readonly cuisinesService: СuisinesService) {}

  @Get()
  getIngredientTypes() {
    return this.cuisinesService.getCuisines();
  }
}
