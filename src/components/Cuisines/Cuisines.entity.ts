import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RecipesEntity } from './../Recipes/Recipes.entity';

@Entity('cuisines')
export class CuisinesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cuisine: string;

  @OneToMany(() => RecipesEntity, (recipes) => recipes.cuisine)
  recipe: RecipesEntity;
}
