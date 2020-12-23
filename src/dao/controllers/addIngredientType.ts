import { getConnection } from 'typeorm';
import { IngredientsType } from './../entities/IngredientsTypes';

export async function addIngredientType(ingredientType) {
  await getConnection()
    .createQueryBuilder()
    .insert()
    .into(IngredientsType)
    .values({
      ingredientType: ingredientType
    })
    .execute();
}
