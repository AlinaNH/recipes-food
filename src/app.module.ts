import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { AislesModule } from './components/Aisles/Aisles.module';
import { CuisinesModule } from './components/Cuisines/Cuisines.module';
import { MealtypesModule } from './components/Mealtypes/Mealtypes.module';
import { ProductsModule } from './components/Products/Products.module';
import { UnitsModule } from './components/Units/Units.module';

@Module({
  imports: [
    ConfigModule,
    AislesModule,
    CuisinesModule,
    MealtypesModule,
    ProductsModule,
    UnitsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
