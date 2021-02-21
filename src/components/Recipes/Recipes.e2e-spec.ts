/* eslint-disable max-len */
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '../../app.module';

describe('Recipes API', () => {
  let app: NestExpressApplication;

  const recipe: any = {
    title: 'test',
    image: 'https://spoonacular.com/recipeImages/716429-556x370.jpg',
    servings: 2,
    minutes: 40,
    source: 'https://spoonacular.com/pasta-with-garlic-scallions-cauliflower-breadcrumbs-716429',
    instruction: 'test instruction',
    cuisine: 'None',
    mealtypes: ['none'],
    ingredients: [{ product: 'apricot', quantity: 2.00, unit: 'fruit' }]
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('add recipe', () => {
    it('sending incorrect recipe object by POST /recipes return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({});
      expect(body).toEqual({ added: false, message: 'Recipe must be sent like recipe: title: string, image: string, servings: number, minutes: number, sourse: string, instruction: string, cuisine: string, mealtypes: string[], ingredients: Array<{product: string, quantity: number, unit: string}>' });
    });

    it('sending non-string title in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.title = 123;
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'Title must be a string' });
    });

    it('sending invalid image URL in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.image = 'invalid';
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'Image URL is not valid' });
    });

    it('sending non-number servings in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.servings = 'invalid';
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'Servings must be a number' });
    });

    it('sending non-number minutes in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.minutes = 'invalid';
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'Minutes must be a number' });
    });

    it('sending invalid source URL in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.source = 'invalid';
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'Source URL is not valid' });
    });

    it('sending non-string instruction in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.instruction = 123;
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'Instruction must be a string' });
    });

    it('sending cuisine which doesn\'t exist in database in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.cuisine = 'notExists';
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'Cuisine \'notExists\' doens\'t exist in database' });
    });

    it('sending incorrect mealtypes array in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.mealtypes = 'invalid';
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'Meal types must be send like string[]' });
    });

    it('sending empty mealtypes array in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.mealtypes = [];
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'Recipe must have at least one meal type' });
    });

    it('sending mealtypes array with incorrect elements in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.mealtypes = [123];
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'Meal types must be strings' });
    });

    it('sending mealtype which doesn\'t exist in database in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.mealtypes = ['notExists'];
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'Meal type(s) \'notExists\' not exist in database' });
    });

    it('sending incorrect ingredients array in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.ingredients = {};
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'Ingredients must be send like ingredients: Array<{product: string, quantity: number, unit: string}>' });
    });

    it('sending empty ingredients array in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.ingredients = [];
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'Recipe must have at least one ingredient' });
    });

    it('sending ingredients array with duplicates in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.ingredients = ['duplicate', 'duplicate'];
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'Recipe mustn\'t have duplicate igredients' });
    });

    it('sending product in ingredients which doesn\'t exist in database in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.ingredients = [{ product: 'notExists', quantity: 2.00, unit: 'fruit' }];
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'Product(s) \'notExists\' not exist in database' });
    });

    it('sending non-number quantity in ingredients in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.ingredients = [{ product: 'ale', quantity: 'notNumber', unit: 'fruit' }];
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'All the quantities must be numbers' });
    });

    it('sending unit in ingredients which doesn\'t exist in database in recipe by POST /recipes return an error', async () => {
      const invalidRecipe = Object.assign({}, recipe);
      invalidRecipe.ingredients = [{ product: 'notExists', quantity: 2.00, unit: 'notExists' }];
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: invalidRecipe
        });
      expect(body).toEqual({ added: false, message: 'Product(s) \'notExists\' not exist in database' });
    });

    it('sending correct recipe object by POST /recipes return { added: \'test\'', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: recipe
        });
      expect(body).toEqual({ added: 'test' });
    });

    it('sending recipe which already exists in database by POST /recipes return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipe: recipe
        });
      expect(body).toEqual({ added: false, message: 'Recipe \'test\' already exists in database' });
    });
  });

  describe('get recipe', () => {
    it('sending recipe title by GET /recipes return a recipe object', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/recipes/test')
        .set('Accept', 'application/json');
      body.found.ingredients[0].quantity = 2.00;
      expect(body).toEqual({ found: recipe });
    });

    it('sending recipe title which doesn\'t exist in database by GET /recipes return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/recipes/notExists')
        .set('Accept', 'application/json');
      expect(body).toEqual({ found: false, message: 'Recipe \'notExists\' is not found' });
    });
  });

  describe('get recipes', () => {
    it('GET /recipes returns all recipes', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/recipes')
        .set('Accept', 'application/json');
      expect([...body].some((e) => e.title === 'test')).toBeTruthy();
    });
  });

  describe('get recipe by title', () => {
    it('GET /recipes/bytitle/:title returns recipe data by title', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/recipes/bytitle/test')
        .set('Accept', 'application/json');
      expect(body[0].title === 'test').toBeTruthy();
    });
  });

  describe('get recipes', () => {
    it('GET /recipes returns all recipes', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/recipes')
        .set('Accept', 'application/json');
      expect([...body].some((e) => e.title === 'test')).toBeTruthy();
    });
  });

  describe('get recipe titles', () => {
    it('GET /recipes/titles returns all recipes titles', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/recipes/titles')
        .set('Accept', 'application/json');
      expect([...body].some((e) => e === 'test')).toBeTruthy();
    });
  });

  describe('get recipes by titles', () => {
    it('GET /recipes/bytitles/:titles returns recipes by titles', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/recipes/bytitles/' + JSON.stringify(['test']))
        .set('Accept', 'application/json');
      expect([...body].some((e) => e[0].title === 'test')).toBeTruthy();
    });
  });

  describe('get recipes by ingredients', () => {
    it('GET /recipes/byingredients/:ingredients returns recipes by ingredients', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/recipes/byingredients/' + JSON.stringify(['apricot']))
        .set('Accept', 'application/json');
      expect([...body].some((e) => e.title === 'test')).toBeTruthy();
    });
  });

  describe('get recipes by mealtypes', () => {
    it('GET /recipes/bymealtypes/:mealtypes returns recipes by mealtypes', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/recipes/bymealtypes/' + JSON.stringify(['none']))
        .set('Accept', 'application/json');
      expect([...body].some((e) => e.title === 'test')).toBeTruthy();
    });
  });

  describe('delete recipe', () => {
    it('sending recipe title DELETE /recipes return {deleted: \'test\'}', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipeTitle: recipe.title
        });
      expect(body).toEqual({ deleted: 'test' });
    });

    it('sending recipe title which doesn\'t exist in database by DELETE /recipes return an error}', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/recipes')
        .set('Accept', 'application/json')
        .send({
          recipeTitle: 'notExists'
        });
      expect(body).toEqual({ deleted: false, message: 'Recipe \'notExists\' is not found' });
    });
  });
});
