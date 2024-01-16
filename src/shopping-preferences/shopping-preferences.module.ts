import { Module } from '@nestjs/common';
import { ShoppingPreferencesService } from './shopping-preferences.service';
import { ShoppingPreferencesController } from './shopping-preferences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShoppingPreference } from './entities/shopping-preference.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingPreference])],
  controllers: [ShoppingPreferencesController],
  providers: [ShoppingPreferencesService],
})
export class ShoppingPreferencesModule {}
