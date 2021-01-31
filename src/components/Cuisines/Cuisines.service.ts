import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { CuisinesEntity } from './Cuisines.entity';

@Injectable()
export class СuisinesService {
  async getCuisines(): Promise<Array<{ cuisine: string }>> {
    const result = await getConnection( )
      .createQueryBuilder()
      .select('cuisine')
      .from(CuisinesEntity, 'cuisines')
      .getRawMany();
    return result.map((e) => e.cuisine);
  }
}
