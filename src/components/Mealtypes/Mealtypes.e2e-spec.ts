import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../../app.module';
import mealtypes from '../../data/mealtypes';

describe('Mealtypes API', () => {
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

  describe('get all meal types', () => {
    it('GET /mealtypes return all meal typesa', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/mealtypes')
        .set('Accept', 'application/json');
      expect([...body].map((e) => e)).toEqual(mealtypes.data);
    });
  });
});
