import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { AislesEntity } from './Aisles.entity';

@Injectable()
export class AislesService {
  private async hasAisle(aisle: string): Promise<boolean> {
    const result = await getConnection()
      .createQueryBuilder()
      .select('aisle')
      .from(AislesEntity, 'aisles')
      .where('aisle = :aisle', { aisle: aisle })
      .getRawOne();
    return !!result;
  }

  private checkAisle(aisle: string): { message: string } {
    if (aisle === '') return { message: 'Aisle must not be empty' };
    else if (typeof(aisle) !== 'string') {
      return { message: 'Aisle must be sent like { aisle: string }' };
    } else return { message: 'valid' };
  }

  async addAisle(aisle: string): Promise<{ added: string | boolean, message?: string }> {
    const checked = this.checkAisle(aisle);
    const exists = await this.hasAisle(aisle);
    if (checked.message === 'valid' && !exists) {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(AislesEntity)
        .values({ aisle: aisle })
        .execute();
      return { added: aisle };
    } else {
      return {
        added: false,
        message: checked.message === 'valid'
          ? 'Aisle already exists'
          : checked.message
      };
    }
  }

  async deleteAisle(aisle: string)
  :Promise<{ deleted: string | boolean, message?: string }> {
    const checked = this.checkAisle(aisle);
    const exists = await this.hasAisle(aisle);
    if (checked.message === 'valid' && exists) {
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(AislesEntity)
        .where('aisle = :aisle', { aisle: aisle })
        .execute();
      return { deleted: aisle };
    } else {
      return {
        deleted: false,
        message: checked.message === 'valid'
          ? `'${aisle}' is not found`
          : checked.message
      };
    }
  }

  async getAisle(aisle: string)
  : Promise<{ found: string | boolean, message?: string }> {
    const checked = this.checkAisle(aisle);
    const exists = await this.hasAisle(aisle);
    if (checked.message === 'valid' && exists) {
      return { found: aisle };
    } else {
      return {
        found: false,
        message: `'${aisle}' is not found`
      };
    }
  }

  async getAisles()
  : Promise<Array<{aisle: 'string'}>> {
    const result = await getConnection()
      .createQueryBuilder()
      .select('aisle')
      .from(AislesEntity, 'aisles')
      .getRawMany();
    return result.map((e) => e.aisle);
  }
}
