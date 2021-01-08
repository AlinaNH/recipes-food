import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { IngredientsTypes } from './IngredientsTypes.entity';

@Injectable()
export class IngredientsTypesService {
  private async hasType(type: string): Promise<boolean> {
    const result = await getConnection()
      .createQueryBuilder()
      .select('type')
      .from(IngredientsTypes, 'ingredients-types')
      .where('type = :type', { type: type })
      .getRawOne();
    return !!result;
  }

  private checkType(type: string): { message: string } {
    if (type === '') return { message: 'Ingredient type should not be empty' };
    else if (typeof(type) !== 'string') {
      return { message: 'Ingredient type must be a string' };
    } else return { message: 'valid' };
  }

  async addType(type: string): Promise<{ added: string | boolean, message?: string }> {
    const checked = this.checkType(type);
    const exists = await this.hasType(type);
    if (checked.message === 'valid' && !exists) {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(IngredientsTypes)
        .values({ type: type })
        .execute();
      return { added: type };
    } else {
      return {
        added: false,
        message: checked.message === 'valid'
          ? 'Ingredient type already exists'
          : checked.message
      };
    }
  }

  async deleteIngredientType(type: string)
  :Promise<{ deleted: string | boolean, message?: string }> {
    const checked = this.checkType(type);
    const exists = await this.hasType(type);
    if (checked.message === 'valid' && exists) {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(IngredientsTypes)
        .where('type = :type', { type: type })
        .execute();
      return { deleted: type };
    } else {
      return {
        deleted: false,
        message: checked.message === 'valid'
          ? 'Ingredient type already exists'
          : checked.message
      };
    }
  }

  async getIngredientTypes()
  : Promise<Array<{type: 'string'}>> {
    return await getConnection()
      .createQueryBuilder()
      .select('type')
      .from(IngredientsTypes, 'ingredients-types')
      .getRawMany();
  }

  async getIngredientType(type: string)
  : Promise<{ found: string | boolean, message?: string }> {
    const checked = this.checkType(type);
    const exists = await this.hasType(type);
    if (checked.message === 'valid' && exists) {
      return { found: type };
    } else {
      return {
        found: false,
        message: checked.message === 'valid'
          ? type + ' is not found'
          : checked.message
      };
    }
  }
}
