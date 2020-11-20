import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRecipeTable1601482563596 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'recipe',
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
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'country_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'is_spice',
            type: 'boolean',
          },
          {
            name: 'time',
            type: 'int2',
          },
          {
            name: 'img',
            type: 'text',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'recipe',
      new TableForeignKey({
        columnNames: ['country_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'country',
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.query(
      // eslint-disable-next-line max-len
      'CREATE TYPE e_recipe_type AS ENUM (\'soup\', \'dessert\', \'drink\', \'salad\', \'second\')',
    );

    await queryRunner.query('ALTER TABLE recipe ADD COLUMN type e_recipe_type');

    await queryRunner.query(
      'CREATE TYPE e_recipe_difficult AS ENUM (\'easy\', \'medium\', \'hard\')',
    );

    await queryRunner.query(
      'ALTER TABLE recipe ADD COLUMN difficult e_recipe_difficult',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('recipe');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('country_id') !== -1,
    );
    await queryRunner.dropForeignKey('recipe', foreignKey);
    await queryRunner.dropTable('recipe');
    await queryRunner.query('DROP TYPE e_recipe_difficult');
    await queryRunner.query('DROP TYPE e_recipe_type');
  }
}
