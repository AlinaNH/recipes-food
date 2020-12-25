import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'dotenv';

config();
@Module({
  providers: [ConfigService],
  exports: [ConfigService],
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: ['dist/src/dao/entities/*.js'],
      migrations: ['dist/src/dao/migrations/*.js'],
      cli: {
        migrationsDir: 'src/dao/migrations',
        entitiesDir: 'src/dao/entities'
      }
    }),
  ],
})
export class ConfigModule {}
