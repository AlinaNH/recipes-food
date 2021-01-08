import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientsController } from './Ingredients.controller';
import { IngredientsService } from './Ingredients.service';
import { Ingredients } from './Ingredients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredients])],
  controllers: [IngredientsController],
  providers: [IngredientsService]
})
export class IngredientsModule {}
