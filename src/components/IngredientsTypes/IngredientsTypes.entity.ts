import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ingredients } from '../Ingredients/Ingredients.entity';

@Entity('ingredients-types')
export class IngredientsTypes {
  @PrimaryGeneratedColumn()
  ingredientTypeID: number;

  @Column()
  ingredientType: string;

  @OneToMany(() => Ingredients, (ingredients) => ingredients.ingredientTypes)
  ingredients: Ingredients;
}
