import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealTypesController } from './MealTypes.controller';
import { MealTypesService } from './MealTypes.service';
import { MealTypes } from './MealTypes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MealTypes])],
  controllers: [MealTypesController],
  providers: [MealTypesService]
})
export class MealTypesModule {}
