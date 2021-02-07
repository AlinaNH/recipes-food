/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1610889925636 implements MigrationInterface {
  name = 'CreateDatabase1610889925636'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "product" character varying NOT NULL, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "aisles" ("id" SERIAL NOT NULL, "aisle" character varying NOT NULL, CONSTRAINT "PK_0ebc6c2317d6d0698d98a85ae17" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "mealtypes" ("id" SERIAL NOT NULL, "mealtype" character varying NOT NULL, CONSTRAINT "PK_c4f1612412b0178f04c9abd34bd" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "units" ("id" SERIAL NOT NULL, "unit" character varying NOT NULL, CONSTRAINT "PK_5a8f2f064919b587d93936cb223" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "ingredients" ("id" SERIAL NOT NULL, "quantity" NUMERIC(5,2) NOT NULL, "productId" integer, "unitId" integer, CONSTRAINT "PK_9240185c8a5507251c9f15e0649" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "recipes" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "image" character varying NOT NULL, "servings" integer NOT NULL, "minutes" integer NOT NULL, "source" character varying NOT NULL, "instruction" character varying NOT NULL, "cuisinesId" integer, CONSTRAINT "PK_8f09680a51bf3669c1598a21682" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "cuisines" ("id" SERIAL NOT NULL, "cuisine" character varying NOT NULL, CONSTRAINT "PK_22b98d435f9359f707c764953a5" PRIMARY KEY ("id"))`);
    await queryRunner.query(`CREATE TABLE "products_aisles_aisles" ("productsId" integer NOT NULL, "aislesId" integer NOT NULL, CONSTRAINT "PK_79c9a05854aaef0241b720c7da2" PRIMARY KEY ("productsId", "aislesId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_cd6ea02995da11d0eae336dea9" ON "products_aisles_aisles" ("productsId") `);
    await queryRunner.query(`CREATE INDEX "IDX_fd58f389c21b9cadae7a58b3f5" ON "products_aisles_aisles" ("aislesId") `);
    await queryRunner.query(`CREATE TABLE "recipes_mealtypes_mealtypes" ("recipesId" integer NOT NULL, "mealtypesId" integer NOT NULL, CONSTRAINT "PK_93d022f569d0ee828b715a86d42" PRIMARY KEY ("recipesId", "mealtypesId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_3828782d1609e521187a1fabde" ON "recipes_mealtypes_mealtypes" ("recipesId") `);
    await queryRunner.query(`CREATE INDEX "IDX_af9aeb83255412e4ed1c716dcf" ON "recipes_mealtypes_mealtypes" ("mealtypesId") `);
    await queryRunner.query(`CREATE TABLE "recipes_ingredients_ingredients" ("recipesId" integer NOT NULL, "ingredientsId" integer NOT NULL, CONSTRAINT "PK_b1e16acd8bc92eccf1463df1b3e" PRIMARY KEY ("recipesId", "ingredientsId"))`);
    await queryRunner.query(`CREATE INDEX "IDX_698d9343327827895a6824c453" ON "recipes_ingredients_ingredients" ("recipesId") `);
    await queryRunner.query(`CREATE INDEX "IDX_39b388ccc78dde4d852ea76f1b" ON "recipes_ingredients_ingredients" ("ingredientsId") `);
    await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_45086227ab44452354335f03876" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "ingredients" ADD CONSTRAINT "FK_1cf19bd84e13a2a90f6e54be3ee" FOREIGN KEY ("unitId") REFERENCES "units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "recipes" ADD CONSTRAINT "FK_ca5115800a2c0379707c3403d42" FOREIGN KEY ("cuisinesId") REFERENCES "cuisines"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "products_aisles_aisles" ADD CONSTRAINT "FK_cd6ea02995da11d0eae336dea90" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "products_aisles_aisles" ADD CONSTRAINT "FK_fd58f389c21b9cadae7a58b3f5e" FOREIGN KEY ("aislesId") REFERENCES "aisles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "recipes_mealtypes_mealtypes" ADD CONSTRAINT "FK_3828782d1609e521187a1fabdea" FOREIGN KEY ("recipesId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "recipes_mealtypes_mealtypes" ADD CONSTRAINT "FK_af9aeb83255412e4ed1c716dcf5" FOREIGN KEY ("mealtypesId") REFERENCES "mealtypes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "recipes_ingredients_ingredients" ADD CONSTRAINT "FK_698d9343327827895a6824c4536" FOREIGN KEY ("recipesId") REFERENCES "recipes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    await queryRunner.query(`ALTER TABLE "recipes_ingredients_ingredients" ADD CONSTRAINT "FK_39b388ccc78dde4d852ea76f1b6" FOREIGN KEY ("ingredientsId") REFERENCES "ingredients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipes_ingredients_ingredients" DROP CONSTRAINT "FK_39b388ccc78dde4d852ea76f1b6"`);
    await queryRunner.query(`ALTER TABLE "recipes_ingredients_ingredients" DROP CONSTRAINT "FK_698d9343327827895a6824c4536"`);
    await queryRunner.query(`ALTER TABLE "recipes_mealtypes_mealtypes" DROP CONSTRAINT "FK_af9aeb83255412e4ed1c716dcf5"`);
    await queryRunner.query(`ALTER TABLE "recipes_mealtypes_mealtypes" DROP CONSTRAINT "FK_3828782d1609e521187a1fabdea"`);
    await queryRunner.query(`ALTER TABLE "products_aisles_aisles" DROP CONSTRAINT "FK_fd58f389c21b9cadae7a58b3f5e"`);
    await queryRunner.query(`ALTER TABLE "products_aisles_aisles" DROP CONSTRAINT "FK_cd6ea02995da11d0eae336dea90"`);
    await queryRunner.query(`ALTER TABLE "recipes" DROP CONSTRAINT "FK_ca5115800a2c0379707c3403d42"`);
    await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_1cf19bd84e13a2a90f6e54be3ee"`);
    await queryRunner.query(`ALTER TABLE "ingredients" DROP CONSTRAINT "FK_45086227ab44452354335f03876"`);
    await queryRunner.query(`DROP INDEX "IDX_39b388ccc78dde4d852ea76f1b"`);
    await queryRunner.query(`DROP INDEX "IDX_698d9343327827895a6824c453"`);
    await queryRunner.query(`DROP TABLE "recipes_ingredients_ingredients"`);
    await queryRunner.query(`DROP INDEX "IDX_af9aeb83255412e4ed1c716dcf"`);
    await queryRunner.query(`DROP INDEX "IDX_3828782d1609e521187a1fabde"`);
    await queryRunner.query(`DROP TABLE "recipes_mealtypes_mealtypes"`);
    await queryRunner.query(`DROP INDEX "IDX_fd58f389c21b9cadae7a58b3f5"`);
    await queryRunner.query(`DROP INDEX "IDX_cd6ea02995da11d0eae336dea9"`);
    await queryRunner.query(`DROP TABLE "products_aisles_aisles"`);
    await queryRunner.query(`DROP TABLE "cuisines"`);
    await queryRunner.query(`DROP TABLE "recipes"`);
    await queryRunner.query(`DROP TABLE "ingredients"`);
    await queryRunner.query(`DROP TABLE "units"`);
    await queryRunner.query(`DROP TABLE "mealtypes"`);
    await queryRunner.query(`DROP TABLE "aisles"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
