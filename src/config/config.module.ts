import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();
@Module({
  providers: [ConfigService],
  exports: [ConfigService]
})
export class ConfigModule {}
