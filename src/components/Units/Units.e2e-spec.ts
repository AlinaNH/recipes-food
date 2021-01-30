import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../../app.module';
import units from './../../data/units';

describe('Units API', () => {
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

  describe('get all units', () => {
    it('GET /units return all units', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/units')
        .set('Accept', 'application/json');
      expect([...body].map((e) => e)).toEqual(units.data);
    });
  });
});
