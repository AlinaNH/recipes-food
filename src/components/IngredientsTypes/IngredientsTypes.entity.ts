import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Ingredients } from '../Ingredients/Ingredients.entity';

@Entity('ingredients-types')
export class IngredientsTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;

  @OneToMany(() => Ingredients, (ingredients) => ingredients.type)
  ingredients: Ingredients;
}
