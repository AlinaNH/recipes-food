/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIngredientsTypesAndIngredientsTables1608927473053 implements MigrationInterface {
  name = 'CreateIngredientsTypesAndIngredientsTables1608927473053'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "ingredients_types" ("ingredientTypeID" SERIAL NOT NULL, "ingredientType" character varying NOT NULL, CONSTRAINT "PK_f03487728c66236b6faeb3bdd7c" PRIMARY KEY ("ingredientTypeID"))`);
    await queryRunner.query(`CREATE TABLE "ingredients" ("ingredientID" SERIAL NOT NULL, "ingredientName" character varying NOT NULL, "ingredientUnit" character varying NOT NULL, "ingredientTypesIngredientTypeID" integer, CONSTRAINT "PK_97c446f0106c40239246e6a61f0" PRIMARY KEY ("ingredientID"))`);
    await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_9f09c50bbd05b1f8eab8513a487" FOREIGN KEY ("ingredientTypesIngredientTypeID") REFERENCES "ingredients_types"("ingredientTypeID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_9f09c50bbd05b1f8eab8513a487"`);
    await queryRunner.query(`DROP TABLE "ingredients"`);
    await queryRunner.query(`DROP TABLE "ingredients_types"`);
  }
}
