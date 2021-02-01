import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { ProductsEntity } from '../Products/Products.entity';
import { UnitsEntity } from '../Units/Units.entity';
import { RecipesEntity } from '../Recipes/Recipes.entity';

@Entity('ingredients')
export class IngredientsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 5, scale: 2 })
  quantity: number;

  @ManyToOne(
    () => ProductsEntity,
    (products) => products.product,
  )
  product: ProductsEntity;

  @ManyToOne(
    () => UnitsEntity,
    (Units) => Units.unit,
  )
  unit: UnitsEntity;

  @ManyToMany((type) => RecipesEntity, (recipes) => recipes.ingredients)
  recipes: RecipesEntity[];
}
