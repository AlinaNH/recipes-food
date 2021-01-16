import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AislesController } from './Aisles.controller';
import { AislesService } from './Aisles.service';
import { AislesEntity } from './Aisles.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AislesEntity])],
  controllers: [AislesController],
  providers: [AislesService]
})
export class AislesModule {}
