import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MealtypesController } from './Mealtypes.controller';
import { MealtypesService } from './Mealtypes.service';
import { MealtypesEntity } from './Mealtypes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MealtypesEntity])],
  controllers: [MealtypesController],
  providers: [MealtypesService]
})
export class MealtypesModule {}
