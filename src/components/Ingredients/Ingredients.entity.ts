import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IngredientsTypes } from '../IngredientsTypes/IngredientsTypes.entity';

@Entity('ingredients')
export class Ingredients {
  @PrimaryGeneratedColumn()
  ingredientID: number;

  @Column()
  ingredientName: string;

  @Column()
  ingredientUnit: string;

  @ManyToOne(
    () => IngredientsTypes,
    (IngredientsTypes) => IngredientsTypes.ingredients,
  )
  ingredientTypes: IngredientsTypes[];
}
