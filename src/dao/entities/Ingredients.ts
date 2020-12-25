import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IngredientsType } from './IngredientsTypes';

@Entity()
export class Ingredients {
  @PrimaryGeneratedColumn()
  ingredientID: number;

  @Column()
  ingredientName: string;

  @Column()
  ingredientUnit: string;

  @ManyToOne(
    () => IngredientsType,
    (IngredientsType) => IngredientsType.ingredients,
  )
  ingredientTypes: IngredientsType[];
}
