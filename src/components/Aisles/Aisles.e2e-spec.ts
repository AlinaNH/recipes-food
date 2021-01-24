/* eslint-disable max-len */
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '../../app.module';

describe('Aisles API', () => {
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

  describe('add aisle', () => {
    it('sending { aisle: \'test\' } by POST /aisles returns { aisle: \'test\' }', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/aisles')
        .set('Accept', 'application/json')
        .send({ aisle: 'test' });
      expect(body).toEqual({ added: 'test' });
    });

    it('sending { aisle: 123 } by POST /aisles returns an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/aisles')
        .set('Accept', 'application/json')
        .send({ aisle: 123 });
      expect(body).toEqual({ added: false, message: 'Aisle must be sent like { aisle: string }' });
    });

    it('sending { aisle: \'\' } by POST /aisles returns an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/aisles')
        .set('Accept', 'application/json')
        .send({ aisle: '' });
      expect(body).toEqual({ added: false, message: 'Aisle must not be empty' });
    });

    it('sending aisles which already exists in database by POST /aisles returns an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/aisles')
        .set('Accept', 'application/json')
        .send({ aisle: 'test' });
      expect(body).toEqual({ added: false, message: 'Aisle already exists' });
    });
  });

  describe('get aisle', () => {
    it('GET /aisles/test returns { found: \'test\' }', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/aisles/test')
        .set('Accept', 'application/json');
      expect(body).toEqual({ found: 'test' });
    });

    it('GET /aisles/notfound returns an error', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/aisles/notfound')
        .set('Accept', 'application/json');
      expect(body).toEqual({ found: false, message: '\'notfound\' is not found' });
    });
  });

  describe('get all aisles', () => {
    it('GET /aisles return all aisles', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/aisles')
        .set('Accept', 'application/json');
      expect([...body].some((e) => e === 'test')).toBeTruthy();
    });
  });

  describe('delete aisle', () => {
    it('sending { aisle: \'test\' } by DELETE /aisles returns { deleted: \'test\' }', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/aisles')
        .set('Accept', 'application/json')
        .send({ aisle: 'test' });
      expect(body).toEqual({ deleted: 'test' });
    });

    it('sending { aisle: 123 } by DELETE /aisles returns an error', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/aisles')
        .set('Accept', 'application/json')
        .send({ aisle: 123 });
      expect(body).toEqual({ deleted: false, message: 'Aisle must be sent like { aisle: string }' });
    });

    it('sending { aisle: \'\' } by DELETE /aisles returns an error', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/aisles')
        .set('Accept', 'application/json')
        .send({ aisle: '' });
      expect(body).toEqual({ deleted: false, message: 'Aisle must not be empty' });
    });

    it('sending aisle which does not exist in database by DELETE /ingredients-types returns an error', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/aisles')
        .set('Accept', 'application/json')
        .send({ aisle: 'test' });
      expect(body).toEqual({ deleted: false, message: '\'test\' is not found' });
    });
  });
});
