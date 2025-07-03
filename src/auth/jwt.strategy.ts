import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { AuthService } from "./auth.service";
import { JwtPayload } from "./jwt.payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor (
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly authService: AuthService,
    ){
        super({
            secretOrKey: 'super-secret',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: JwtPayload){
        const {email} = payload;
        const user = await this.authService.findOneByEmail(email);

    if (!user){
        throw new UnauthorizedException();
    }
    return user;
    }

}