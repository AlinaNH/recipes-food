/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateCuisinesTable1610208775757 implements MigrationInterface {
  name = 'CreateCuisinesTable1610208775757'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "cuisines" ("id" SERIAL NOT NULL, "cuisine" character varying NOT NULL, CONSTRAINT "PK_22b98d435f9359f707c764953a5" PRIMARY KEY ("id"))`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "cuisines"`);
  }
}
