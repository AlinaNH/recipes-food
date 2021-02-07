/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';
import cuisines from '../data/cuisines';
import mealtypes from '../data/mealtypes';
import aisles from '../data/aisles';
import products from '../data/products';
import units from '../data/units';

export class InsertData9999999999998 implements MigrationInterface {
  name = 'InsertData9999999999998'

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

    products.data.forEach(async (product) => {
      product.type.split(';').forEach(async (aisle) => {
        await queryRunner.query(`INSERT INTO "products_aisles_aisles" ("productsId", "aislesId") VALUES (
          (SELECT id FROM "products" WHERE product='${product.name}'),
          (SELECT id FROM "aisles" WHERE aisle='${aisle}')
        )`);
      });
    });

    units.data.forEach(async (unit) => {
      await queryRunner.query(`INSERT INTO "units" ("unit") VALUES ('${unit}')`);
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM "units"`);
    await queryRunner.query(`DELETE FROM "products_aisles_aisles"`);
    await queryRunner.query(`DELETE FROM "products"`);
    await queryRunner.query(`DELETE FROM "aisles"`);
    await queryRunner.query(`DELETE FROM "mealtypes"`);
    await queryRunner.query(`DELETE FROM "cuisines"`);
  }
}
