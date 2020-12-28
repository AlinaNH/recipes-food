import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import {
  IngredientsTypesModule
} from './components/IngredientsTypes/IngredientsTypes.module';

@Module({
  imports: [
    ConfigModule,
    IngredientsTypesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
