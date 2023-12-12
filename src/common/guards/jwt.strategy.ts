import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { PassportStrategy } from "@nestjs/passport"
// import { ExtractJwt, Strategy } from "passport-jwt"
import { IEnv } from "../interfaces/env.interface"
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly config: ConfigService<IEnv>) {
        const jwtSecret = config.get('JWT_SECRET');
        // console.log(jwtSecret);


        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtSecret,
        });
    }

    async validate(payload: any) {
        delete payload.iat;
        delete payload.exp;
        // console.log(playload);

        return {
            id: payload.id,
            username: payload.username,
        }
    }
}