/* eslint-disable max-len */
import { Injectable } from '@nestjs/common';
import { title } from 'process';
import { getConnection, getRepository } from 'typeorm';
import { CuisinesEntity } from '../Cuisines/Cuisines.entity';
import { IngredientsEntity } from '../Ingredients/Ingredients.entity';
import { MealtypesEntity } from '../Mealtypes/Mealtypes.entity';
import { ProductsEntity } from '../Products/Products.entity';
import { UnitsEntity } from '../Units/Units.entity';
import { RecipesEntity } from './Recipes.entity';

interface iRecipe {
  title: string,
  image: string,
  servings: number,
  minutes: number,
  source: string,
  instruction: string,
  cuisine: string,
  mealtypes: string[],
  ingredients: Array<{product: string, quantity: number, unit: string}>
};

@Injectable()
export class RecipesService {
  private validURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' // protocol
      +'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' // domain name
      +'((\\d{1,3}\\.){3}\\d{1,3}))' // OR ip (v4) address
      +'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' // port and path
      +'(\\?[;&a-z\\d%_.~+=-]*)?' // query string
      +'(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
    return !!pattern.test(str);
  }

  private async hasCuisine(cuisine: string): Promise<string> {
    const result = await getConnection( )
      .createQueryBuilder()
      .select('cuisine')
      .from(CuisinesEntity, 'cuisines')
      .where('cuisine = :cuisine', { cuisine: cuisine })
      .getRawOne();
    return !!result ? `valid` : `Cuisine '${cuisine}' doens't exist in database`;
  }

  private async hasMealtypes(mealtypes: string[]): Promise<string> {
    const existedMealtypes = await getConnection()
      .createQueryBuilder(MealtypesEntity, 'mealtypes')
      .where('mealtypes.mealtype IN (:...mealtypes)', { mealtypes: mealtypes })
      .getMany();
    const notExists = mealtypes.filter((e) => existedMealtypes.map((e) => e.mealtype).indexOf(e) === -1);
    return (!notExists.length) ? 'valid' : `Meal type(s) '${notExists.join(', ')}' not exist in database`;
  }

  private async hasProducts(products: string[]): Promise<string> {
    const existedProducts = await getConnection()
      .createQueryBuilder(ProductsEntity, 'products')
      .where('products.product IN (:...products)', { products: products })
      .getMany();
    const notExists = products.filter((e) => existedProducts.map((e) => e.product).indexOf(e) === -1);
    return (!notExists.length) ? 'valid' : `Product(s) '${notExists.join(', ')}' not exist in database`;
  }

  private async hasUnits(units: string[]): Promise<string> {
    const existedUnits = await getConnection()
      .createQueryBuilder(UnitsEntity, 'units')
      .where('units.unit IN (:...units)', { units: units })
      .getMany();
    const notExists = units.filter((e) => existedUnits.map((e) => e.unit).indexOf(e) === -1);
    return (!notExists.length) ? 'valid' : `Units(s) '${notExists.join(', ')}' not exist in database`;
  }

  private async hasRecipe(title: string): Promise<string> {
    const result = await getConnection( )
      .createQueryBuilder()
      .select('recipes')
      .from(RecipesEntity, 'recipes')
      .where('title = :title', { title: title })
      .getRawOne();
    return !!result ? `Recipe '${title}' already exists in database` : `valid`;
  }

  private async checkRecipes(recipe): Promise<string> {
    if (!(recipe instanceof Object)) return 'Recipe must be sent like recipe: title: string, image: string, servings: number, minutes: number, sourse: string, instruction: string, cuisine: string, mealtypes: string[], ingredients: Array<{product: string, quantity: number, unit: string}>';
    if (typeof(recipe.title) !== 'string') return 'Title must be a string';
    const hasRecipe = await this.hasRecipe(recipe.title);
    if (hasRecipe !== 'valid') return hasRecipe;
    const checkImage = recipe.image.match(/\.(jpeg|jpg|gif|png)$/) !== null;
    if (!checkImage) return 'Image URL is not valid';
    if (typeof(recipe.servings) !== 'number') return 'Servings must be a number';
    if (typeof(recipe.minutes) !== 'number') return 'Minutes must be a number';
    const checkSource = this.validURL(recipe.source);
    if (!checkSource) return 'Source URL is not valid';
    if (typeof(recipe.instruction) !== 'string') return 'Instruction must be a string';
    const hasCuisine = await this.hasCuisine(recipe.cuisine);
    if (hasCuisine !== 'valid') return hasCuisine;
    if (!Array.isArray(recipe.mealtypes)) return 'Meal types must be send like string[]';
    if (recipe.mealtypes.length === 0) return 'Recipe must have at least one meal type';
    if (!(recipe.mealtypes.every((mealtype) => typeof(mealtype) === 'string'))) return 'Meal types must be strings';
    const hasMealtypes = await this.hasMealtypes(recipe.mealtypes);
    if (hasMealtypes !== 'valid') return hasMealtypes;
    if (!Array.isArray(recipe.ingredients)) return 'Ingredients must be send like ingredients: Array<{product: string, quantity: number, unit: string}>';
    if (recipe.ingredients.length === 0) return 'Recipe must have at least one ingredient';
    const uniqueIngredients = new Set(recipe.ingredients.map((ingredient) => ingredient.product));
    if (recipe.ingredients.length !== [...uniqueIngredients].length) return 'Recipe mustn\'t have duplicate igredients';
    const products = recipe.ingredients.map((ingredient) => ingredient.product);
    const hasProducts = await this.hasProducts(products);
    if (hasProducts !== 'valid') return hasProducts;
    const checkQuantity = recipe.ingredients.every((ingredient) => typeof(ingredient.quantity) === 'number');
    if (!checkQuantity) return 'All the quantities must be numbers';
    const units = recipe.ingredients.map((ingredient) => ingredient.unit);
    const hasUnits = await this.hasUnits(units);
    if (hasUnits !== 'valid') return hasUnits;
    return 'valid';
  }

  private async getCuisineId(cuisine: string) {
    return await getConnection()
      .createQueryBuilder()
      .select('id')
      .from(CuisinesEntity, 'cuisines')
      .where('cuisine = :cuisine', { cuisine: cuisine })
      .getRawOne();
  }

  private async getMealtypesId(mealtypes: string[]) {
    return await getConnection()
      .createQueryBuilder(MealtypesEntity, 'mealtypes')
      .where('mealtypes.mealtype IN (:...mealtypes)', { mealtypes: mealtypes })
      .getMany();
  }

  private async getProductId(product: string) {
    return await getConnection( )
      .createQueryBuilder()
      .select('id')
      .from(ProductsEntity, 'products')
      .where('product = :product', { product: product })
      .getRawOne();
  }

  private async getUnitId(unit: string) {
    return await getConnection( )
      .createQueryBuilder()
      .select('id')
      .from(UnitsEntity, 'units')
      .where('unit = :unit', { unit: unit })
      .getRawOne();
  }

  private async getRecipeId(title: string) {
    return await getConnection()
      .createQueryBuilder()
      .select('id')
      .from(RecipesEntity, 'recipes')
      .where('title = :title', { title: title })
      .getRawOne();
  }

  async addRecipe(recipe: iRecipe)
  : Promise<{ added: string | boolean, message?: string }> {
    const checkRecipe = await this.checkRecipes(recipe);
    if (checkRecipe === 'valid') {
      const cuisineId = await this.getCuisineId(recipe.cuisine);
      const mealtypesId = await this.getMealtypesId(recipe.mealtypes);

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('recipes')
        .values({
          title: recipe.title,
          image: recipe.image,
          servings: recipe.servings,
          minutes: recipe.minutes,
          source: recipe.source,
          instruction: recipe.instruction,
          cuisine: cuisineId.id
        })
        .execute();

      const recipeId = await this.getRecipeId(recipe.title);

      mealtypesId.forEach(async (id) => {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into('recipes_mealtypes_mealtypes')
          .values({
            recipesId: recipeId.id,
            mealtypesId: id
          })
          .execute();
      });

      await Promise.all(recipe.ingredients.map(async (e, i) => {
        const productId = await this.getProductId(e.product);
        const unitId = await this.getUnitId(e.unit);

        const ingredientId = await getConnection()
          .createQueryBuilder()
          .insert()
          .into('ingredients')
          .values({
            product: productId,
            quantity: recipe.ingredients[i].quantity,
            unit: unitId
          })
          .returning('id')
          .execute();

        await getConnection()
          .createQueryBuilder()
          .insert()
          .into('recipes_ingredients_ingredients')
          .values({
            recipesId: recipeId.id,
            ingredientsId: ingredientId.identifiers[0].id
          })
          .execute();
      }));

      return { added: recipe.title };
    } else return { added: false, message: checkRecipe };
  }

  async deleteRecipe(recipeTitle: string) {
    const exists = await this.hasRecipe(recipeTitle);
    if (exists !== 'valid') {
      const recipeId = await this.getRecipeId(recipeTitle);
      const ingredients = await getConnection()
        .getRepository(IngredientsEntity)
        .createQueryBuilder('ingredients')
        .leftJoinAndSelect('ingredients.recipes', 'recipes')
        .getMany();

      const ingredientsId = ingredients.filter((ingredient) => ingredient.recipes[0].id === recipeId.id);

      await getConnection()
        .createQueryBuilder()
        .delete()
        .from('recipes_ingredients_ingredients')
        .where('recipesId = :recipesId', { recipesId: recipeId.id })
        .execute();

      ingredientsId.forEach(async (ingredient) => {
        await getConnection()
          .createQueryBuilder()
          .delete()
          .from('ingredients')
          .where('id = :id', { id: ingredient.id })
          .execute();
      });

      await getConnection()
        .createQueryBuilder()
        .delete()
        .from('recipes_mealtypes_mealtypes')
        .where('recipesId = :recipesId', { recipesId: recipeId.id })
        .execute();

      await getConnection()
        .createQueryBuilder()
        .delete()
        .from('recipes')
        .where('id = :id', { id: recipeId.id })
        .execute();

      return { deleted: recipeTitle };
    } else {
      return { deleted: false, message: `Recipe '${recipeTitle}' is not found` };
    }
  }

  async getRecipe(recipeTitle: string)
  : Promise<{ found: string | boolean, message?: string }> {
    const exists = await this.hasRecipe(recipeTitle);
    if (exists !== 'valid') {
      const recipeId = await this.getRecipeId(recipeTitle);
      const recipe: any = await getConnection()
        .getRepository(RecipesEntity)
        .createQueryBuilder('recipes')
        .where('recipes.id = :id', { id: recipeId.id })
        .leftJoinAndSelect('recipes.cuisine', 'cuisine')
        .leftJoinAndSelect('recipes.mealtypes', 'mealtypes')
        .leftJoinAndSelect('recipes.ingredients', 'ingredients')
        .getMany();

      const ingredientsId = recipe[0].ingredients.map((e) => e.id);
      const ingredientsData = await getConnection()
        .createQueryBuilder(IngredientsEntity, 'ingredients')
        .where('ingredients.id IN (:...id)', { id: ingredientsId })
        .leftJoinAndSelect('ingredients.product', 'product')
        .leftJoinAndSelect('ingredients.unit', 'unit')
        .getMany();
      const ingredients = ingredientsData.map((ingredient) => {
        return {
          product: ingredient.product.product,
          quantity: ingredient.quantity,
          unit: ingredient.unit.unit
        };
      });

      delete recipe[0].id;
      recipe[0].cuisine = recipe[0].cuisine.cuisine;
      recipe[0].mealtypes = recipe[0].mealtypes.map((e) => e.mealtype);
      recipe[0].ingredients = ingredients;

      return { found: recipe[0] };
    } else return { found: false, message: `Recipe '${recipeTitle}' is not found` };
  }

  async getRecipes() {
    const recipes = await getConnection()
      .getRepository(RecipesEntity)
      .createQueryBuilder('recipes')
      .leftJoinAndSelect('recipes.cuisine', 'cuisine')
      .leftJoinAndSelect('recipes.mealtypes', 'mealtypes')
      .leftJoinAndSelect('recipes.ingredients', 'ingredients')
      .leftJoinAndSelect('ingredients.product', 'product')
      .leftJoinAndSelect('ingredients.unit', 'unit')
      .getMany();

    recipes.forEach((e: any) => {
      delete e.id;
      e.cuisine = e.cuisine.cuisine;
      e.mealtypes = e.mealtypes.map((m) => m.mealtype);
      e.ingredients = e.ingredients.map((i) => {
        delete i.id;
        return {
          product: i.product.product,
          quantity: i.quantity,
          unit: i.unit.unit
        };
      });
    });
    return recipes;
  }

  async getShortRecipesData() {
    const recipes = await getConnection()
      .getRepository(RecipesEntity)
      .createQueryBuilder('recipes')
      .leftJoinAndSelect('recipes.cuisine', 'cuisine')
      .leftJoinAndSelect('recipes.mealtypes', 'mealtypes')
      .getMany();

    recipes.forEach((e: any) => {
      delete e.id; delete e.image; delete e.source, delete e.instruction;
      e.cuisine = e.cuisine.cuisine;
      e.mealtypes = e.mealtypes.map((m) => m.mealtype);
    });
    return recipes;
  }
}
