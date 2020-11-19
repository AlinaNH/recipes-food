import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateIngredientTable1601489445688 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ingredient',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar(64)',
            isUnique: true,
            isNullable: false,
          },
        ],
      }),
    );

    await queryRunner.query(
      // eslint-disable-next-line max-len
      'CREATE TYPE e_ingredient_type AS ENUM (\'meat\', \'vegetable\', \'fruit\', \'spice\')',
    );

    await queryRunner.query(
      'ALTER TABLE ingredient ADD COLUMN type e_ingredient_type',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ingredient');
    await queryRunner.query('DROP TYPE e_ingredient_type');
  }
}
