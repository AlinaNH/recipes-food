import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { UnitsEntity } from './Units.entity';

@Injectable()
export class UnitsService {
  async getUnits(): Promise<Array<{ unit: string }>> {
    const result = await getConnection()
      .createQueryBuilder()
      .select('unit')
      .from(UnitsEntity, 'units')
      .getRawMany();
    return result.map((e) => e.unit);
  }
}
