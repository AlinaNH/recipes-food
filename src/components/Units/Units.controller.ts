import { Controller, Get } from '@nestjs/common';
import { UnitsService } from './Units.service';

@Controller('units')
export class UnitsController {
  constructor(private readonly unitsService: UnitsService) {}

  @Get()
  getCuisines() {
    return this.unitsService.getUnits();
  }
}
