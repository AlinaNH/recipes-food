import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { IngredientsTypes } from '../IngredientsTypes/IngredientsTypes.entity';

@Entity('ingredients')
export class Ingredients {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  unit: string;

  @ManyToOne(
    () => IngredientsTypes,
    (IngredientsTypes) => IngredientsTypes.ingredients,
  )
  type: IngredientsTypes[];
}
