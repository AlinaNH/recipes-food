import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ingredients } from './../Ingredients/Ingredients.entity';

@Entity()
export class IngredientsTypes {
  @PrimaryGeneratedColumn()
  ingredientTypeID: number;

  @Column()
  ingredientType: string;

  @OneToMany(() => Ingredients, (ingredients) => ingredients.ingredientTypes)
  ingredients: Ingredients;
}
