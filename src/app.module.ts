import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_PORT, DB_USER } from './config/constants';
import { ProductoModule } from './producto/producto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    
TypeOrmModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: (ConfigService: ConfigService) => ({
    type: 'mysql',
    host: ConfigService.get(DB_HOST),
    port: +ConfigService.get(DB_PORT),
    username: ConfigService.get(DB_USER),
    password: ConfigService.get(DB_PASSWORD),
    database: ConfigService.get(DB_DATABASE),
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: true,
    migrationsRun: false,
  }),
  inject: [ConfigService],
}),
    
ProductoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
