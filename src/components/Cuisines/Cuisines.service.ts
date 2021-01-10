import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { Cuisines } from './Cuisines.entity';

@Injectable()
export class СuisinesService {
  async getCuisines(): Promise<Array<{id: number, cuisine: string}>> {
    return await getConnection( )
      .createQueryBuilder()
      .select('cuisine')
      .from(Cuisines, 'cuisines')
      .getRawMany();
  }
}
