import {
  Controller,
  Post,
  Delete,
  Get,
  Body,
  Param
} from '@nestjs/common';
import { ProductsService } from './Products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {};

  @Post()
  addProduct(@Body() body: { product: {name: string, aisles: string []} }) {
    return this.productsService.addProduct(body.product);
  }

  @Delete()
  deleteProduct(@Body() body: { productName: string }) {
    return this.productsService.deleteProduct(body.productName);
  }

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get('/names')
  getProductsNames(@Param('names') names: 'names') {
    return this.productsService.getProductsNames();
  }

  @Get(':productName')
  getProduct(@Param('productName') productName: string) {
    return this.productsService.getProduct(productName);
  }
}
