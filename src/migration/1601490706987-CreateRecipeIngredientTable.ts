import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRecipeIngredientTable1601490706987
implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'recipe_ingredient',
        columns: [
          {
            name: 'ingredient_id',
            type: 'int',
            isPrimary: true,
          },
          {
            name: 'recipe_id',
            type: 'int',
            isPrimary: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'recipe_ingredient',
      new TableForeignKey({
        columnNames: ['recipe_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'recipe',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'recipe_ingredient',
      new TableForeignKey({
        columnNames: ['ingredient_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'ingredient',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('recipe_ingredient');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('recipe_id') !== -1,
    );
    await queryRunner.dropForeignKey('recipe_ingredient', foreignKey);

    const foreignKey2 = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('ingredient_id') !== -1,
    );
    await queryRunner.dropForeignKey('recipe_ingredient', foreignKey2);

    await queryRunner.dropTable('recipe_ingredient');
  }
}
