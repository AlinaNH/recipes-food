import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('cuisines')
export class Cuisines {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cuisine: string;
}
