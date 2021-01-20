import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { CuisinesEntity } from '../Cuisines/Cuisines.entity';
import { MealtypesEntity } from '../Mealtypes/Mealtypes.entity';
import { IngredientsEntity } from '../Ingredients/Ingredients.entity';

@Entity('recipes')
export class RecipesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  image: string;

  @Column()
  servings: number;

  @Column()
  minutes: number;

  @Column()
  source: string;

  @Column()
  instruction: string;

  @ManyToOne(
    () => CuisinesEntity,
    (Cuisines) => Cuisines.cuisine
  )
  cuisine: CuisinesEntity[];

  @ManyToMany((type) => MealtypesEntity, (mealtypes) => mealtypes.recipes, {
    cascade: true
  })
  @JoinTable()
  mealtypes: MealtypesEntity[];

  @ManyToMany((type) => IngredientsEntity, (ingredients) => ingredients.recipes, {
    cascade: true
  })
  @JoinTable()
  ingredients: IngredientsEntity[];
}
