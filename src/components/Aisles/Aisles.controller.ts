import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param
} from '@nestjs/common';
import { AislesService } from './Aisles.service';

@Controller('aisles')
export class AislesController {
  constructor(private readonly aislesService: AislesService) {}

  @Post()
  addAisle(@Body() body: {aisle: string}) {
    return this.aislesService.addAisle(body.aisle);
  }

  @Delete()
  deleteAisle(@Body() body: {aisle: string}) {
    return this.aislesService.deleteAisle(body.aisle);
  }

  @Get(':aisle')
  getAisle(@Param('aisle') aisle: string) {
    return this.aislesService.getAisle(aisle);
  }

  @Get()
  getAisles() {
    return this.aislesService.getAisles();
  }
}
