/* eslint-disable max-len */
import { getConnection, MigrationInterface, QueryRunner } from 'typeorm';
import cuisines from '../data/cuisines';
import mealtypes from '../data/mealtypes';
import aisles from '../data/aisles';
import products from '../data/products';
import { ProductsEntity } from 'src/components/Products/Products.entity';
import { AislesEntity } from 'src/components/Aisles/Aisles.entity';

export class InsertData9999999999999 implements MigrationInterface {
  name = 'InsertData9999999999999'

  public async up(queryRunner: QueryRunner): Promise<void> {
    cuisines.data.forEach(async (cuisine) => {
      await queryRunner.query(`INSERT INTO "cuisines" ("cuisine") VALUES ('${cuisine}')`);
    });

    mealtypes.data.forEach(async (mealtype) => {
      await queryRunner.query(`INSERT INTO "mealtypes" ("mealtype") VALUES ('${mealtype}')`);
    });

    aisles.data.forEach(async (aisle) => {
      await queryRunner.query(`INSERT INTO "aisles" ("aisle") VALUES ('${aisle}')`);
    });

    products.data.forEach(async (product) => {
      await queryRunner.query(`INSERT INTO "products" ("product") VALUES ('${product.name}')`);
    });

    const productsData = await getConnection()
      .createQueryBuilder()
      .select('*')
      .from(ProductsEntity, 'products')
      .execute();

    const aislesData = await getConnection()
      .createQueryBuilder()
      .select('*')
      .from(AislesEntity, 'aisles')
      .execute();

    products.data.forEach(async (product) => {
      const productId = productsData.filter((data) => data.name === product.name);
      product.type.split(';').forEach(async (aisle) => {
        const aisleId = aislesData.filter((data) => data.aisle === aisle);
        await getConnection()
          .createQueryBuilder()
          .relation(ProductsEntity, 'products')
          .of(productId.id)
          .add(aisleId.id);
      });
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "products_aisles_aisles"`);
    await queryRunner.query(`DELETE FROM "products"`);
    await queryRunner.query(`DELETE FROM "aisles"`);
    await queryRunner.query(`DELETE FROM "mealtypes"`);
    await queryRunner.query(`DELETE FROM "cuisines"`);
  }
}
