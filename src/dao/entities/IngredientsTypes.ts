import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ingredients } from './Ingredients';

@Entity()
export class IngredientsType {
  @PrimaryGeneratedColumn()
  ingredientTypeID: number;

  @Column()
  ingredientType: string;

  @OneToMany(() => Ingredients, (ingredients) => ingredients.ingredientTypes)
  ingredients: Ingredients;
}
