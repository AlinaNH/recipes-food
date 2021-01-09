import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import {
  IngredientsTypesModule
} from './components/IngredientsTypes/IngredientsTypes.module';
import { IngredientsModule } from './components/Ingredients/Ingredients.module';

@Module({
  imports: [
    ConfigModule,
    IngredientsTypesModule,
    IngredientsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
