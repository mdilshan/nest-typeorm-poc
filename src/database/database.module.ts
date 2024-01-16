import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST') ?? 'localhost',
        port: configService.get('POSTGRES_PORT') ?? 5432,
        username: configService.getOrThrow('POSTGRES_USER'),
        password: configService.getOrThrow('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB') ?? 'postgres',
        autoLoadEntities: true,
        synchronize: true, // NOTE: Should not hard coded in real applicaiton. Used it because it is a demo.
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule { }
