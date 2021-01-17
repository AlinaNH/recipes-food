import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { ProductsEntity } from '../Products/Products.entity';

@Entity('aisles')
export class AislesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  aisle: string;

  @ManyToMany((type) => ProductsEntity, (products) => products.aisles)
  products: ProductsEntity[]
}
