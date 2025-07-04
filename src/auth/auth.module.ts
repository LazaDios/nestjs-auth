import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
  PassportModule.register({
    defaultStrategy: 'jwt'
  }),
  JwtModule.register({
    secret: 'super-secret',
    signOptions: { 
      expiresIn: 3600,  //para que a la hora, deba iniciar seccion, nuevamente
    },
  }),
  TypeOrmModule.forFeature([User])],
  providers: [AuthService,JwtStrategy],
  controllers: [AuthController],
  exports:[AuthService, JwtStrategy, PassportModule]
})
export class AuthModule {}