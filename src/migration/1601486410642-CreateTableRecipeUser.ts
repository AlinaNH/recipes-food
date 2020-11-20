import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTableRecipeUser1601486410642 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'recipe_user',
        columns: [
          {
            name: 'user_id',
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
      'recipe_user',
      new TableForeignKey({
        columnNames: ['recipe_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'recipe',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'recipe_user',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('recipe_user');
    const foreignKey = table.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('recipe_id') !== -1,
    );
    await queryRunner.dropForeignKey('recipe_user', foreignKey);

    const table2 = await queryRunner.getTable('recipe_user');
    const foreignKey2 = table2.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('user_id') !== -1,
    );
    await queryRunner.dropForeignKey('recipe_user', foreignKey2);

    await queryRunner.dropTable('recipe_user');
  }
}
