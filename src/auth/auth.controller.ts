import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegistreUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';


@Controller('auth')//para acceder a esta ruta se debe usar la ruta /auth
export class AuthController {
    constructor(private readonly authService: AuthService){}
    

    @Post('/register')
    create(@Body() registreUserDto: RegistreUserDto){
        return this.authService.create(registreUserDto);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto ):Promise<{accessToken:string}>{
        return this.authService.login(loginDto);
    }


}
