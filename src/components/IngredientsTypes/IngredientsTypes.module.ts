import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientsTypesController } from './IngredientsTypes.controller';
import { IngredientsTypesService } from './IngredientsTypes.service';
import { IngredientsTypes } from './IngredientsTypes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IngredientsTypes])],
  controllers: [IngredientsTypesController],
  providers: [IngredientsTypesService]
})
export class IngredientsTypesModule {}
