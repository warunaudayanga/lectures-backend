import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { AuthService } from "../services";
import { AuthDataDto } from "../dtos";
import { TokenData } from "../interfaces";
import { User } from "../../user/entities";
import { CreateUserDto } from "../../user/dtos";
import { Prefix } from "../../../core/enums";
import { JwtAuthGuard } from "../../../core/guards";
import { ReqUser } from "../../../core/decorators";
import { UpdatePasswordDto } from "../dtos/update-password.dto";
import { IStatusResponse } from "../../../core/entity";

@Controller(Prefix.AUTH)
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    register(@Body() createUserDto: CreateUserDto): Promise<User> {
        const { firstName, lastName } = createUserDto;
        const name = `${firstName} ${lastName}`;
        return this.authService.registerUser({ ...createUserDto, name });
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
    @Post("change-password")
    changePassword(@ReqUser() user: User, @Body() updatePasswordDto: UpdatePasswordDto): Promise<IStatusResponse> {
        return this.authService.changePassword(user.id, updatePasswordDto);
    }
}
