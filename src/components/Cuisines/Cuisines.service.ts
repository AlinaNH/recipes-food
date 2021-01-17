import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { CuisinesEntity } from './Cuisines.entity';

@Injectable()
export class СuisinesService {
  async getCuisines(): Promise<Array<{ cuisine: string }>> {
    return await getConnection( )
      .createQueryBuilder()
      .select('cuisine')
      .from(CuisinesEntity, 'cuisines')
      .getRawMany();
  }
}
