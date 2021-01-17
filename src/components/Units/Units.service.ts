import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { UnitsEntity } from './Units.entity';

@Injectable()
export class UnitsService {
  async getUnits(): Promise<Array<{ unit: string }>> {
    return await getConnection( )
      .createQueryBuilder()
      .select('unit')
      .from(UnitsEntity, 'units')
      .getRawMany();
  }
}
