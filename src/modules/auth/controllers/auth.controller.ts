import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "../services";
import { AuthDataDto } from "../dtos";
import { TokenData } from "../interfaces";
import { User } from "../../user/entities";
import { CreateUserDto } from "../../user/dtos";
import { Prefix } from "../../../core/enums";

@Controller(Prefix.AUTH)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    register(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.authService.registerUser(createUserDto);
    }

    @Post("login")
    authenticate(@Body() authDataDto: AuthDataDto): Promise<TokenData> {
        return this.authService.authenticate(authDataDto);
    }
}
