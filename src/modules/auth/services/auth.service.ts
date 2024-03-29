// noinspection JSUnusedGlobalSymbols

import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { join } from "path";
import { readFileSync } from "fs";
import { pbkdf2Sync, randomBytes } from "crypto";
import { JwtService } from "@nestjs/jwt";
import { AuthDataDto } from "../dtos";
import { TokenData } from "../interfaces";
import { AuthErrors } from "../responses";
import { User } from "../../user/entities";
import { RoleService, UserService } from "../../user/services";
import { CreateUserDto } from "../../user/dtos";
import { LoggerService } from "../../../core/services";
import { EntityErrors, IQueryError, IStatusResponse } from "../../../core/entity";
import { Status } from "../../../core/enums";
import { DefaultRoles } from "../../user/enums/default-roles.enum";
import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { Events } from "../../../core/modules/webhook/enums/events.enum";
import { UpdatePasswordDto } from "../dtos/update-password.dto";

@Injectable()
export class AuthService {
    private static keyPath = join(__dirname, "../config/keys");

    private static PRV_KEY = readFileSync(join(AuthService.keyPath, "id_rsa_prv.pem"), "utf8");

    private static PUB_KEY = readFileSync(join(AuthService.keyPath, "id_rsa_pub.pem"), "utf8");

    public static EXPIRES_IN = 60 * 60 * 24;

    constructor(
        private readonly userService: UserService,
        private roleService: RoleService,
        private jwtService: JwtService,
        private eventEmitter: EventEmitter2,
    ) {}

    public static getPrivateKey(): string {
        return AuthService.PRV_KEY;
    }

    public static getPublicKey(): string {
        return AuthService.PUB_KEY;
    }

    public static generateRandomHash(): string {
        return randomBytes(48).toString("hex");
    }

    public static generatePassword(password: string): { salt: string; password: string } {
        const salt = randomBytes(32).toString("hex");
        const hash = pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
        return { salt, password: hash };
    }

    public static verifyHash(password: string, hash: string, salt: string): boolean {
        const generatedHash = pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");
        return hash === generatedHash;
    }

    public issueJWT = (user: User): { expires: number; token: string } => {
        const id = user.id;
        const expiresIn = 20;
        const payload = { sub: id, iat: Date.now() };
        const accessToken = this.jwtService.sign(payload, { expiresIn, algorithm: "RS256" });
        return {
            token: "Bearer " + accessToken,
            expires: expiresIn,
        };
    };

    async registerUser(createUserDto: CreateUserDto, createdBy?: User): Promise<User> {
        const { password, salt } = AuthService.generatePassword(createUserDto.password);
        createUserDto.password = password;
        createUserDto.salt = salt;
        const role = await this.roleService.getOne({ name: DefaultRoles.STUDENT });
        const eh = (e: IQueryError): Error | void => {
            if (e.sqlMessage.match("users.USERNAME")) {
                return new ConflictException(EntityErrors.E_409_EXIST_U("user", "username"));
            } else if (e.sqlMessage.match("users.COURSE_STUDENT_ID")) {
                return new ConflictException(EntityErrors.E_409_EXIST_U("user", "student id"));
            }
        };
        let user = await this.userService.create(
            { ...createUserDto, role, status: Status.ACTIVE, createdBy },
            undefined,
            ["course"],
            eh,
        );
        this.eventEmitter.emit(Events.USER_REGISTERED, user);
        return user;
    }

    async authenticate(authDataDto: AuthDataDto): Promise<TokenData> {
        try {
            const user = await this.userService.getOne({ username: authDataDto.username }, { relations: ["role"] });
            if (!user) {
                return Promise.reject(new HttpException(AuthErrors.AUTH_401_INVALID, HttpStatus.UNAUTHORIZED));
            }
            if (!AuthService.verifyHash(authDataDto.password, user.password, user.salt)) {
                return Promise.reject(new HttpException(AuthErrors.AUTH_401_INVALID, HttpStatus.UNAUTHORIZED));
            }
            if (user.status !== Status.ACTIVE) {
                return Promise.reject(new HttpException(AuthErrors.AUTH_401_NOT_ACTIVE, HttpStatus.UNAUTHORIZED));
            }
            return this.getTokenData(user);
        } catch (err: any) {
            LoggerService.error(err);
            throw new HttpException(AuthErrors.AUTH_401_INVALID, HttpStatus.UNAUTHORIZED);
        }
    }

    async changePassword(id: number, updatePasswordDto: UpdatePasswordDto): Promise<IStatusResponse> {
        const { password, salt } = await this.userService.get(id);
        const { oldPassword, newPassword } = updatePasswordDto;
        if (AuthService.verifyHash(oldPassword, password, salt)) {
            const { password, salt } = AuthService.generatePassword(newPassword);
            return this.userService.update(id, { password, salt });
        }
        throw new NotFoundException(AuthErrors.AUTH_401_INVALID_PASSWORD);
    }

    getTokenData(user: User): TokenData {
        const tokenObject = this.issueJWT(user);
        return {
            token: tokenObject.token,
            expiresIn: tokenObject.expires,
            user,
        };
    }

    public verifyToken(bearerToken: string): { sub: number; iat: number; exp: number } {
        const token = bearerToken.replace("Bearer ", "");
        return this.jwtService.verify(token, {
            publicKey: AuthService.getPublicKey(),
            algorithms: ["RS256"],
        });
    }

    @OnEvent(Events.USER_GET_BY_TOKEN)
    public async getUserByToken(bearerToken: string): Promise<User> {
        try {
            const payload = this.verifyToken(bearerToken);
            let user = await this.userService.get(payload.sub);
            if (!user) {
                return null;
            }
            return user;
        } catch (err: any) {
            LoggerService.error(err);
            return null;
        }
    }
}
