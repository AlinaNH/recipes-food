import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { AislesEntity } from '../Aisles/Aisles.entity';

@Entity('products')
export class ProductsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product: string;

  @ManyToMany((type) => AislesEntity, (aisles) => aisles.products, {
    cascade: true
  })
  @JoinTable()
  aisles: AislesEntity[];
}
