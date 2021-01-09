import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { Ingredients } from './Ingredients.entity';
import { IngredientsTypes } from './../IngredientsTypes/IngredientsTypes.entity';

interface iIngredient {
  name: string,
  unit: string[],
  type: string
};

@Injectable()
export class IngredientsService {
  private checkIngredient(ingredient: iIngredient): { message: string } {
    if (ingredient.name !== ''
      && Array.isArray(ingredient.unit)
      && ingredient.type !== '') return { message: 'valid' };
    else {
      return { message:
      // eslint-disable-next-line max-len
      'Ingredient must be sent like ingredient: { name: string, unit: string[], type: string } and must not be empty'
      };
    }
  }

  private async hasIngredient(ingredientName: string): Promise<boolean> {
    const result = await getConnection( )
      .createQueryBuilder()
      .select('name')
      .from(Ingredients, 'ingredients')
      .where('name = :name', { name: JSON.stringify(ingredientName) })
      .getRawOne();
    return !!result;
  }

  async addIngredient(ingredient: iIngredient)
  : Promise<{ added: string | boolean, message?: string }> {
    const checked = this.checkIngredient(ingredient);
    const exists = await this.hasIngredient(ingredient.name);
    if (checked.message === 'valid' && !exists) {
      const ingredientTypeId = await getConnection()
        .createQueryBuilder()
        .select('id')
        .from(IngredientsTypes, 'ingredients-types')
        .where('type = :type', { type: ingredient.type })
        .getRawOne();

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Ingredients)
        .values({
          name: JSON.stringify(ingredient.name),
          unit: JSON.stringify(ingredient.unit),
          type: (() => ingredientTypeId.id)
        })
        .execute();

      return { added: ingredient.name };
    } else {
      return {
        added: false,
        message: checked.message === 'valid'
          ? 'Ingredient already exists'
          : checked.message
      };
    }
  }

  async deleteIngredient(ingredientName: string)
  : Promise<{ deleted: string | boolean, message?: string }> {
    const exists = await this.hasIngredient(ingredientName);
    if (exists) {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(Ingredients)
        .where('name = :name', { name: JSON.stringify(ingredientName) })
        .execute();
      return { deleted: ingredientName };
    } else {
      return {
        deleted: false,
        message: `Ingredient \'${ingredientName}' is not found`
      };
    }
  }

  async getIngredient(ingredientName: string)
  : Promise<{ found: {
    id: number,
    name: string,
    unit: string,
    type: number
  } | boolean, message?: string }> {
    const exists = await this.hasIngredient(ingredientName);
    if (exists) {
      const result = await getConnection()
        .createQueryBuilder()
        .select('*')
        .from(Ingredients, 'ingredients')
        .where('name = :name', { name: JSON.stringify(ingredientName) })
        .execute();
      return { found: result };
    } else {
      return {
        found: false,
        message: `Ingredient \'${ingredientName}' is not found`
      };
    }
  }

  async getIngredients() {
    return await getConnection()
      .createQueryBuilder(Ingredients, 'ingredients')
      .select(['name', 'unit', '\'ingredients-types\'.type AS type'])
      .innerJoin(
        IngredientsTypes,
        '\'ingredients-types\'',
        'ingredients.typeId = \'ingredients-types\'.id'
      )
      .getRawMany();
  }
}
