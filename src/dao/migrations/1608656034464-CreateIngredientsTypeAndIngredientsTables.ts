/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIngredientsTypeAndIngredientsTables1608656034464 implements MigrationInterface {
  name = 'CreateIngredientsTypeAndIngredientsTables1608656034464'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "ingredients_type" ("ingredientTypeID" SERIAL NOT NULL, "ingredientType" character varying NOT NULL, CONSTRAINT "PK_cfa3d45d1d012ca6a3ffc1ad91d" PRIMARY KEY ("ingredientTypeID"))`);
    await queryRunner.query(`CREATE TABLE "ingredients" ("ingredientID" SERIAL NOT NULL, "ingredientName" character varying NOT NULL, "ingredientUnit" character varying NOT NULL, "ingredientTypesIngredientTypeID" integer, CONSTRAINT "PK_97c446f0106c40239246e6a61f0" PRIMARY KEY ("ingredientID"))`);
    await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_9f09c50bbd05b1f8eab8513a487" FOREIGN KEY ("ingredientTypesIngredientTypeID") REFERENCES "ingredients_type"("ingredientTypeID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_9f09c50bbd05b1f8eab8513a487"`);
    await queryRunner.query(`DROP TABLE "ingredients"`);
    await queryRunner.query(`DROP TABLE "ingredients_type"`);
  }
}
