/* eslint-disable max-len */
import { Injectable } from '@nestjs/common';
import { getConnection } from 'typeorm';
import { ProductsEntity } from './Products.entity';
import { AislesEntity } from '../Aisles/Aisles.entity';

interface iProduct {
  name: string,
  aisles: string[],
};

@Injectable()
export class ProductsService {
  private async hasAisles(aisles: string[]): Promise<string> {
    const existedAisles = await getConnection()
      .createQueryBuilder(AislesEntity, 'aisles')
      .where('aisles.aisle IN (:...aisles)', { aisles: aisles })
      .getMany();
    const notExists = aisles.filter((e) => existedAisles.map((e) => e.aisle).indexOf(e) === -1);
    return (!notExists.length) ? 'valid' : `Aisle(s) '${notExists.join(', ')}' not exist in database`;
  }

  private async hasProduct(productName: string): Promise<boolean> {
    const result = await getConnection( )
      .createQueryBuilder()
      .select('product')
      .from(ProductsEntity, 'products')
      .where('product = :product', { product: productName })
      .getRawOne();
    return !!result;
  }

  private async checkProduct(product: iProduct): Promise<string> {
    if (!(product instanceof Object)) return 'Product must be sent like product: { name: string, aisles: string[] }';
    if (typeof(product.name) !== 'string') return 'Product name must be a string';
    if (product.name === '') return 'Product name must not be empty';
    if (!Array.isArray(product.aisles)) return 'Product must be sent like product: { name: string, aisles: string[] }';
    if (!(product.aisles.every((aisle) => typeof(aisle) === 'string'))) return 'Aisles must be strings';
    if (product.aisles.length === 0) return 'Product must have at least one aisle';
    const hasProduct = await this.hasProduct(product.name);
    if (hasProduct) return `Product '${product.name}' already exists in database`;
    const hasAisles = await this.hasAisles(product.aisles);
    if (hasAisles !== 'valid') return hasAisles;
    return 'valid';
  }

  private async getProductId(productName: string): Promise<{id: number}> {
    return await getConnection()
      .createQueryBuilder()
      .select('id')
      .from(ProductsEntity, 'products')
      .where('product = :product', { product: productName })
      .getRawOne();
  }

  private async getAislesId(aisles: string[]) {
    return await getConnection()
      .createQueryBuilder(AislesEntity, 'aisles')
      .where('aisles.aisle IN (:...aisles)', { aisles: aisles })
      .getMany();
  }

  async addProduct(product: iProduct)
  : Promise<{ added: string | boolean, message?: string }> {
    const checkingProduct = await this.checkProduct(product);
    if (checkingProduct === 'valid') {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('products')
        .values({ product: product.name })
        .orIgnore()
        .execute();

      const productId = await this.getProductId(product.name);
      const aislesId = await this.getAislesId(product.aisles);

      await getConnection()
        .createQueryBuilder()
        .insert()
        .into('products_aisles_aisles')
        .values({
          productsId: productId.id,
          aislesId: aislesId[0].id
        })
        .orIgnore()
        .execute();

      aislesId.forEach(async (aisleId) => {
        await getConnection()
          .createQueryBuilder()
          .insert()
          .into('products_aisles_aisles')
          .values({
            productsId: productId.id,
            aislesId: aisleId.id
          })
          .orIgnore()
          .execute();
      });

      return { added: product.name };
    } else {
      return {
        added: false,
        message: checkingProduct
      };
    }
  }

  async deleteProduct(productName: string)
  : Promise<{ deleted: string | boolean, message?: string }> {
    const exists = await this.hasProduct(productName);
    if (exists) {
      const productId = await this.getProductId(productName);
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from('products_aisles_aisles')
        .where('productsId = :productsId', { productsId: productId.id })
        .execute();
      await getConnection()
        .createQueryBuilder()
        .delete()
        .from(ProductsEntity)
        .where('product = :product', { product: productName })
        .execute();

      return { deleted: productName };
    } else {
      return {
        deleted: false,
        message: `Product \'${productName}' is not found`
      };
    }
  }

  async getProduct(productName: string)
  : Promise<{found: { product: string, aisles: string[] } | boolean, message?: string}> {
    const exists = await this.hasProduct(productName);
    if (exists) {
      const productId = await this.getProductId(productName);
      const productsData = await getConnection()
        .getRepository(ProductsEntity)
        .createQueryBuilder('products')
        .leftJoinAndSelect('products.aisles', 'aisles')
        .getMany();
      const result = productsData
        .filter((data) => data.id === productId.id)
        .map((data) => {
          return {
            product: data.product,
            aisles: data.aisles.map((data) => data.aisle)
          };
        });
      return { found: result[0] };
    } else {
      return {
        found: false,
        message: `Product \'${productName}' is not found`
      };
    }
  }

  async getProducts()
  : Promise<Array<{ product: string, aisles: string[] }>> {
    const productsData = await getConnection()
      .getRepository(ProductsEntity)
      .createQueryBuilder('products')
      .leftJoinAndSelect('products.aisles', 'aisles')
      .getMany();
    return productsData.map((data) => {
      return {
        product: data.product,
        aisles: data.aisles.map((data) => data.aisle)
      };
    });
  };
}
