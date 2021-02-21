import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { MealtypesEntity } from './Mealtypes.entity';

@Injectable()
export class MealtypesService {
  async getMealtypes(): Promise<Array<{ mealtype: string }>> {
    const result = await getConnection( )
      .createQueryBuilder()
      .select('mealtype')
      .from(MealtypesEntity, 'mealtypes')
      .getRawMany();
    return result.map((e) => e.mealtype);
  }
}
