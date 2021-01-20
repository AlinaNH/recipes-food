import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipesController } from './Recipes.controller';
import { RecipesService } from './Recipes.service';
import { RecipesEntity } from './Recipes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RecipesEntity])],
  controllers: [RecipesController],
  providers: [RecipesService]
})
export class RecipesModule {}
