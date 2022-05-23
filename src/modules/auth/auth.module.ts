import { Global, Module } from "@nestjs/common";
import { AuthController } from "./controllers";
import { AuthService } from "./services";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { UserModule } from "../user/user.module";
import { JwtStrategy } from "../../core/strategies";

@Global()
@Module({
    imports: [
        JwtModule.register({
            privateKey: AuthService.getPrivateKey(),
            signOptions: { expiresIn: AuthService.EXPIRES_IN },
        }),
        PassportModule,
        UserModule,
    ],
    controllers: [AuthController],
    providers: [JwtStrategy, AuthService],
    exports: [UserModule],
})
export class AuthModule {}
