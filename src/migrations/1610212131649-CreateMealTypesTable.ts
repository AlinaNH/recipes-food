/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMealTypesTable1610212131649 implements MigrationInterface {
  name = 'CreateMealTypesTable1610212131649'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "meal-types" ("id" SERIAL NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_4d00e664842b7537efdcbb438cc" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "meal-types"`);
  }
}
