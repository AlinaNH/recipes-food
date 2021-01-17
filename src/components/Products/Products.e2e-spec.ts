/* eslint-disable max-len */
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from '../../app.module';

describe('Products API', () => {
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

  describe('add product', () => {
    it('sending incorrect product object by POST /products return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/products')
        .set('Accept', 'application/json')
        .send({ name: 'another product', aisles: ['Other'] });
      expect(body).toEqual({ added: false, message: 'Product must be sent like product: { name: string, aisles: string[] }' });
    });

    it('sending non-string product name by POST /products return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/products')
        .set('Accept', 'application/json')
        .send({ product: { name: 1234, aisles: ['Other'] } });
      expect(body).toEqual({ added: false, message: 'Product name must be a string' });
    });

    it('sending empty product name by POST /products return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/products')
        .set('Accept', 'application/json')
        .send({ product: { name: '', aisles: ['Other'] } });
      expect(body).toEqual({ added: false, message: 'Product name must not be empty' });
    });

    it('sending aisles not as an array by POST /products return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/products')
        .set('Accept', 'application/json')
        .send({ product: { name: 'test', aisles: 'Other' } });
      expect(body).toEqual({ added: false, message: 'Product must be sent like product: { name: string, aisles: string[] }' });
    });

    it('sending aisles not as string by POST /products return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/products')
        .set('Accept', 'application/json')
        .send({ product: { name: 'test', aisles: [123] } });
      expect(body).toEqual({ added: false, message: 'Aisles must be strings' });
    });

    it('sending empty aisles array by POST /products return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/products')
        .set('Accept', 'application/json')
        .send({ product: { name: 'test', aisles: [] } });
      expect(body).toEqual({ added: false, message: 'Product must have at least one aisle' });
    });

    it('sending aisle which doesn\'t exist in database by POST /products return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/products')
        .set('Accept', 'application/json')
        .send({ product: { name: 'test1', aisles: ['notExists'] } });
      expect(body).toEqual({ added: false, message: 'Aisle(s) \'notExists\' not exist in database' });
    });

    it('sending correct product object by POST /products return { added: \'test\' }', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/products')
        .set('Accept', 'application/json')
        .send({ product: { name: 'test', aisles: ['Other'] } });
      expect(body).toEqual({ added: 'test' });
    });

    it('sending product which already exists in database by POST /products return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .post('/products')
        .set('Accept', 'application/json')
        .send({ product: { name: 'test', aisles: ['Other'] } });
      expect(body).toEqual({ added: false, message: 'Product \'test\' already exists in database' });
    });
  });

  describe('get product', () => {
    it('sending product name by GET /product/test return product object', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/products/test')
        .set('Accept', 'application/json');
      expect(body).toEqual({ found: { product: 'test', aisles: ['Other'] } });
    });

    it('sending product name which doesn\'t exist in database by GET /product return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/products/123')
        .set('Accept', 'application/json');
      expect(body).toEqual({ found: false, message: 'Product \'123\' is not found' });
    });
  });

  describe('get all products', () => {
    it('GET /products return all ingredients', async () => {
      const { body } = await request(app.getHttpServer())
        .get('/products')
        .set('Accept', 'application/json');
      expect([...body].some((e) => e.product === 'test')).toBeTruthy();
    });
  });

  describe('delete product', () => {
    it('sending incorrect product name by DELETE /products return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/products')
        .set('Accept', 'application/json')
        .send({ productName: 123 });
      expect(body).toEqual({ deleted: false, message: 'Product \'123\' is not found' });
    });

    it('sending empty field by DELETE /products return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/products')
        .set('Accept', 'application/json')
        .send({ productName: '' });
      expect(body).toEqual({ deleted: false, message: 'Product \'\' is not found' });
    });

    it('sending product name by DELETE /products return { deleted: \'test\' }', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/products')
        .set('Accept', 'application/json')
        .send({ productName: 'test' });
      expect(body).toEqual({ deleted: 'test' });
    });

    it('sending product name which doesn\'t exist in database by DELETE /products return an error', async () => {
      const { body } = await request(app.getHttpServer())
        .delete('/products')
        .set('Accept', 'application/json')
        .send({ productName: 'test' });
      expect(body).toEqual({ deleted: false, message: 'Product \'test\' is not found' });
    });
  });
});
