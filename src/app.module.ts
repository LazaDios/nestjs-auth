import { TypeOrmModule } from '@nestjs/typeorm';

import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 5000,
    username: 'root',
    password: 'root123',
    database: 'database',
    autoLoadEntities: true,
    synchronize: true, //no usar en produccion
  }), AuthModule,
],
  controllers: [],
  providers: [],
})
export class AppModule {}
