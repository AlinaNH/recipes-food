import { Controller, Get } from '@nestjs/common';
import { MealtypesService } from './Mealtypes.service';

@Controller('mealtypes')
export class MealtypesController {
  constructor(private readonly mealtypesService: MealtypesService) {}

  @Get()
  getIngredientTypes() {
    return this.mealtypesService.getMealtypes();
  }
}
