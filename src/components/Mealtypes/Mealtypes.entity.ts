import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { RecipesEntity } from '../Recipes/Recipes.entity';

@Entity('mealtypes')
export class MealtypesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  mealtype: string;

  @ManyToMany((type) => RecipesEntity, (recipes) => recipes.mealtypes)
  recipes: RecipesEntity[];
}
