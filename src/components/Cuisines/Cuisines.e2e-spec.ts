import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../../app.module';
import cuisines from './../../data/cuisines';

describe('Cuisines API', () => {
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

  describe('get all cuisines', () => {
    it('GET /cuisines return all cuisines', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/cuisines')
        .set('Accept', 'application/json');
      expect([...body].map((e) => e)).toEqual(cuisines.data);
    });
  });
});
