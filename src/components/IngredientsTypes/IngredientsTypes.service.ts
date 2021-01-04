import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { IngredientsTypes } from './IngredientsTypes.entity';

@Injectable()
export class IngredientsTypesService {
  async addIngredientType(ingredientType: string) {
    if (ingredientType === '') {
      throw new HttpException(
        'Ingredient type should not be empty',
        HttpStatus.BAD_REQUEST
      );
    }

    if (typeof(ingredientType) === 'string') {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(IngredientsTypes)
        .values({ ingredientType: ingredientType })
        .execute();
      return true;
    }

    throw new HttpException(
      'Ingredient type should be a string',
      HttpStatus.BAD_REQUEST
    );
  }
}
