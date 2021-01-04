/* eslint-disable max-len */
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '../../app.module';

describe('AppController (e2e)', () => {
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

  it('send object with string by /ingredients-types/add-ingredient-type return true', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/ingredients-types/add-ingredient-type')
      .set('Accept', 'application/json')
      .send({ ingredientType: 'test' })
      .expect(201);
  });

  it('send object with number by /ingredients-types/add-ingredient-type return an error', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/ingredients-types/add-ingredient-type')
      .set('Accept', 'application/json')
      .send({ ingredientType: 123 });
    expect(body).toEqual({ statusCode: 400, message: 'Ingredient type should be a string' });
  });

  it('send object with empty string by /ingredients-types/add-ingredient-type return an error', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/ingredients-types/add-ingredient-type')
      .set('Accept', 'application/json')
      .send({ ingredientType: '' });
    expect(body).toEqual({ statusCode: 400, message: 'Ingredient type should not be empty' });
  });
});
