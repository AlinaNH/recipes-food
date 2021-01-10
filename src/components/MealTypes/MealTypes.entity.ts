import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('meal-types')
export class MealTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string;
}
