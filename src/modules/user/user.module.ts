import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Role, User } from "./entities";
import { RoleRepository, UserRepository } from "./repositories";
import { RoleController, UserController } from "./controllers";
import { RoleService, UserService } from "./services";
import { LecturesModule } from "../lectures/lectures.module";

@Module({
    imports: [TypeOrmModule.forFeature([User, Role, UserRepository, RoleRepository]), LecturesModule],
    controllers: [UserController, RoleController],
    providers: [UserService, RoleService],
    exports: [UserService, RoleService],
})
export class UserModule {}
