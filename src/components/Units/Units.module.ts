import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitsController } from './Units.controller';
import { UnitsService } from './Units.service';
import { UnitsEntity } from './Units.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnitsEntity])],
  controllers: [UnitsController],
  providers: [UnitsService]
})
export class UnitsModule {}
