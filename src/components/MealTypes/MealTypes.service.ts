import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { MealTypes } from './MealTypes.entity';

@Injectable()
export class MealTypesService {
  async getMealTypes(): Promise<Array<{id: number, mealType: string}>> {
    return await getConnection( )
      .createQueryBuilder()
      .select('type')
      .from(MealTypes, 'meal-types')
      .getRawMany();
  }
}
