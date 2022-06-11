import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../services";
import { AuthDataDto } from "../dtos";
import { TokenData } from "../interfaces";
import { User } from "../../user/entities";
import { CreateUserDto } from "../../user/dtos";
import { Prefix } from "../../../core/enums";
import { JwtAuthGuard } from "../../../core/guards";
import { ReqUser } from "../../../core/decorators";
import { relations } from "../../../core/config";
import { UserService } from "../../user/services";

@Controller(Prefix.AUTH)
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

    @Post("register")
    register(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.authService.registerUser(createUserDto);
    }

    @Post("login")
    authenticate(@Body() authDataDto: AuthDataDto): Promise<TokenData> {
        return this.authService.authenticate(authDataDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post("refresh")
    authenticateByToken(@ReqUser() user: User): TokenData {
        return this.authService.getTokenData(user);
    }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    getAuthUser(@ReqUser() user: User): Promise<User> {
        return this.userService.get(user.id, { relations: ["role", "course", ...relations] });
    }
}
