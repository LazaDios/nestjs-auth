import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegistreUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'; //no tenemos funciones de autocompletado
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt.payload.interface';


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService,
    ){}
    
    async create(registreUserDto:RegistreUserDto){
        const {name, email, password} = registreUserDto;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        try{
            const newUser = this.userRepository.create({
                name,
                email,
                password: hashedPassword, // Guarda la contraseña hasheada
            });
            await this.userRepository.save(newUser);
            return newUser;

        } catch (error) {
      // Manejo de errores específicos
      // Error de duplicidad (por ejemplo, username o email ya existen)
      if (error.code === 'ER_DUP_ENTRY' || error.message.includes('duplicate key value')) {
        throw new ConflictException('El nombre de usuario o el correo electrónico ya existen.');
    }
    throw new InternalServerErrorException();
    }
}
    async findOneByEmail(email:string){
        return await this.userRepository.findOneBy({email});
    }

    async login(loginDto: LoginDto): Promise<{accessToken:string}>{
        const {email, password} = loginDto;
        const user = await this.findOneByEmail(email);

        if(user && (await this.checkPassword(password,(user).password)))
        {
            const payload: JwtPayload={id: user.id, email, active:user.activate};
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken};
        }
        throw new UnauthorizedException('please check your credentials');

    }

    //en el video esta en users.repository
    async checkPassword(password:string, userPassword:string){
        return await bcrypt.compare(password, userPassword);
    }
}