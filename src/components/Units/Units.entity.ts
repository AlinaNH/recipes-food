import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IngredientsEntity } from '../Ingredients/Ingredients.entity';

@Entity('units')
export class UnitsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unit: string;

  @OneToMany(() => IngredientsEntity, (ingredients) => ingredients.unit)
  ingredient: IngredientsEntity;
}
