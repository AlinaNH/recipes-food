/* eslint-disable max-len */
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getConnection } from 'typeorm';

import { AppModule } from '../../app.module';
import { IngredientsTypes } from '../IngredientsTypes/IngredientsTypes.entity';

describe('Ingredients API', () => {
  let app: NestExpressApplication;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(IngredientsTypes)
      .values({ type: 'forTests' })
      .execute();
  });

  afterAll(async () => {
    getConnection()
      .createQueryBuilder()
      .delete()
      .from(IngredientsTypes)
      .where('type = :type', { type: 'forTests' })
      .execute();

    await app.close();
  });

  describe('add ingredient', () => {
    it('sending correct ingredient object by POST /ingredients return { added: \'test\' }', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/ingredients')
        .set('Accept', 'application/json')
        .send({ ingredient: { name: 'test', unit: ['test'], type: 'forTests' } });
      expect(body).toEqual({ added: 'test' });
    });

    it('sending incorrect ingredient object by POST /ingredients return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/ingredients')
        .set('Accept', 'application/json')
        .send({ ingredient: { name: 'test', unit: 'test', type: 'forTests' } });
      expect(body).toEqual({ added: false, message: 'Ingredient must be sent like ingredient: { name: string, unit: string[], type: string } and must not be empty' });
    });

    it('sending ingredient object with empty field by POST /ingredients return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/ingredients')
        .set('Accept', 'application/json')
        .send({ ingredient: { name: 'test', unit: ['test'], type: '' } });
      expect(body).toEqual({ added: false, message: 'Ingredient must be sent like ingredient: { name: string, unit: string[], type: string } and must not be empty' });
    });

    it('sending ingredient object which already exists in database by POST /ingredients return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/ingredients')
        .set('Accept', 'application/json')
        .send({ ingredient: { name: 'test', unit: ['test'], type: 'forTests' } });
      expect(body).toEqual({ added: false, message: 'Ingredient already exists' });
    });
  });

  describe('get ingredient', () => {
    it('sending ingredient name by GET /ingredients/test return ingredient object', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/ingredients/test')
        .set('Accept', 'application/json');
      expect([...body.found].some((e) => JSON.parse(e.name) === 'test')).toBeTruthy();
    });

    it('sending ingredient name which doesn\'t exist in database by GET /ingredients return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/ingredients/123')
        .set('Accept', 'application/json');
      expect(body).toEqual({ found: false, message: 'Ingredient \'123\' is not found' });
    });
  });

  describe('get all ingredients', () => {
    it('GET /ingredients return all ingredients', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/ingredients')
        .set('Accept', 'application/json');
      expect([...body].some((e) => JSON.parse(e.name) === 'test')).toBeTruthy();
    });
  });

  describe('delete ingredient', () => {
    it('sending ingredient name by DELETE /ingredients return { deleted: \'test\' }', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/ingredients')
        .set('Accept', 'application/json')
        .send({ ingredientName: 'test' });
      expect(body).toEqual({ deleted: 'test' });
    });

    it('sending incorrect ingredient name by DELETE /ingredients return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/ingredients')
        .set('Accept', 'application/json')
        .send({ ingredientName: '123' });
      expect(body).toEqual({ deleted: false, message: 'Ingredient \'123\' is not found' });
    });

    it('sending empty field by DELETE /ingredients return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/ingredients')
        .set('Accept', 'application/json')
        .send({ ingredientName: '' });
      expect(body).toEqual({ deleted: false, message: 'Ingredient \'\' is not found' });
    });

    it('sending ingredient name which doesn\'t exist in database by DELETE /ingredients return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/ingredients')
        .set('Accept', 'application/json')
        .send({ ingredientName: 'test' });
      expect(body).toEqual({ deleted: false, message: 'Ingredient \'test\' is not found' });
    });
  });
});
