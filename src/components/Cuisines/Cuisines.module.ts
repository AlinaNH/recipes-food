import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuisinesController } from './Cuisines.controller';
import { СuisinesService } from './Cuisines.service';
import { CuisinesEntity } from './Cuisines.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CuisinesEntity])],
  controllers: [CuisinesController],
  providers: [СuisinesService]
})
export class CuisinesModule {}
