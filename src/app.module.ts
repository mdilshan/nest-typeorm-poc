import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { ShoppingPreferencesModule } from './shopping-preferences/shopping-preferences.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    DatabaseModule,
    UsersModule,
    ShoppingPreferencesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
