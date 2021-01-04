/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIngredientsTypesAndIngredientsTables1609778882240 implements MigrationInterface {
  name = 'CreateIngredientsTypesAndIngredientsTables1609778882240'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "ingredients-types" ("ingredientTypeID" SERIAL NOT NULL, "ingredientType" character varying NOT NULL, CONSTRAINT "PK_b614747f4e4453abb8b8a60c635" PRIMARY KEY ("ingredientTypeID"))`);
    await queryRunner.query(`CREATE TABLE "ingredients" ("ingredientID" SERIAL NOT NULL, "ingredientName" character varying NOT NULL, "ingredientUnit" character varying NOT NULL, "ingredientTypesIngredientTypeID" integer, CONSTRAINT "PK_97c446f0106c40239246e6a61f0" PRIMARY KEY ("ingredientID"))`);
    await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_9f09c50bbd05b1f8eab8513a487" FOREIGN KEY ("ingredientTypesIngredientTypeID") REFERENCES "ingredients-types"("ingredientTypeID") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_9f09c50bbd05b1f8eab8513a487"`);
    await queryRunner.query(`DROP TABLE "ingredients"`);
    await queryRunner.query(`DROP TABLE "ingredients-types"`);
  }
}
