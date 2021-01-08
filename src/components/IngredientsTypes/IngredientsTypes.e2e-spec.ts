/* eslint-disable max-len */
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '../../app.module';

describe('IngredientsTypes API', () => {
  let app: NestExpressApplication;

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

  describe('add ingredient type', () => {
    it('sending { type: \'test\' } by POST /ingredients-types return { added: \'test\' }', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/ingredients-types')
        .set('Accept', 'application/json')
        .send({ type: 'test' });
      expect(body).toEqual({ added: 'test' });
    });

    it('sending { type: 123 } by POST /ingredients-types return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/ingredients-types')
        .set('Accept', 'application/json')
        .send({ type: 123 });
      expect(body).toEqual({ added: false, message: 'Ingredient type must be sent like { type: string }' });
    });

    it('sending { type: \'\' } by POST /ingredients-types return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/ingredients-types')
        .set('Accept', 'application/json')
        .send({ type: '' });
      expect(body).toEqual({ added: false, message: 'Ingredient type must not be empty' });
    });

    it('sending type which already exists in database by POST /ingredients-types return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/ingredients-types')
        .set('Accept', 'application/json')
        .send({ type: 'test' });
      expect(body).toEqual({ added: false, message: 'Ingredient type already exists' });
    });
  });

  describe('get ingredient type', () => {
    it('sending  test by GET /ingredients-types/test return { found: \'test\' }', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/ingredients-types/test')
        .set('Accept', 'application/json');
      expect(body).toEqual({ found: 'test' });
    });

    it('sending notfound by GET /ingredients-types/notfound return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/ingredients-types/notfound')
        .set('Accept', 'application/json');
      expect(body).toEqual({ found: false, message: '\'notfound\' is not found' });
    });
  });

  describe('get all ingredient type', () => {
    it('GET /ingredients-types return all ingredients\' types with { type: \'test\' }', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/ingredients-types')
        .set('Accept', 'application/json');
      expect([...body].some((e) => e.type === 'test')).toBeTruthy();
    });
  });

  describe('delete ingredient type', () => {
    it('sending { type: \'test\' } by DELETE /ingredients-types return { deleted: \'test\' }', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/ingredients-types')
        .set('Accept', 'application/json')
        .send({ type: 'test' });
      expect(body).toEqual({ deleted: 'test' });
    });

    it('sending { type: 123 } by DELETE /ingredients-types return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/ingredients-types')
        .set('Accept', 'application/json')
        .send({ type: 123 });
      expect(body).toEqual({ deleted: false, message: 'Ingredient type must be sent like { type: string }' });
    });

    it('sending { type: \'\' } by DELETE /ingredients-types return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/ingredients-types')
        .set('Accept', 'application/json')
        .send({ type: '' });
      expect(body).toEqual({ deleted: false, message: 'Ingredient type must not be empty' });
    });

    it('sending type which does not exist in database by DELETE /ingredients-types return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/ingredients-types')
        .set('Accept', 'application/json')
        .send({ type: 'test' });
      expect(body).toEqual({ deleted: false, message: '\'test\' is not found' });
    });
  });
});
