/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIngredientsTypesAndIngredientsTables1609955679551 implements MigrationInterface {
  name = 'CreateIngredientsTypesAndIngredientsTables1609955679551'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "ingredients-types" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_b670d349a34fcdc28ded0fcaa3f" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "ingredients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "unit" character varying NOT NULL, "typeId" integer, CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
    await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_561ab4b77db0e2dd3396415f9ca" FOREIGN KEY ("typeId") REFERENCES "ingredients-types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_561ab4b77db0e2dd3396415f9ca"`);
    await queryRunner.query(`DROP TABLE "ingredients"`);
    await queryRunner.query(`DROP TABLE "ingredients-types"`);
  }
}
