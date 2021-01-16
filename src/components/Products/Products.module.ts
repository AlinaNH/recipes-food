import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './Products.controller';
import { ProductsService } from './Products.service';
import { ProductsEntity } from './Products.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProductsEntity])],
  controllers: [ProductsController],
  providers: [ProductsService]
})
export class ProductsModule {}
