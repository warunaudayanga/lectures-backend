import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { User } from "../../modules/user/entities";
import { AuthErrors } from "../../modules/auth/responses";
import { UserService } from "../../modules/user/services";
import { AuthService } from "../../modules/auth/services";
import { LoggerService } from "../services";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: UserService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: AuthService.getPublicKey(),
            algorithms: ["RS256"],
        });
    }

    // noinspection JSUnusedGlobalSymbols
    async validate(jwtPayload: any): Promise<User> {
        try {
            const user = await this.userService.get(jwtPayload.sub, { relations: ["role"] });
            if (!user) {
                return Promise.reject(new HttpException(AuthErrors.AUTH_401_INVALID_TOKEN, HttpStatus.UNAUTHORIZED));
            }
            return user;
        } catch (err: any) {
            LoggerService.error(err);
            return Promise.reject(new HttpException(AuthErrors.AUTH_401_INVALID_TOKEN, HttpStatus.UNAUTHORIZED));
        }
    }
}
