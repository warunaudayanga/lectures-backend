import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { User } from "../entities";
import { CreateUserDto, UpdateUserDto, UpdateUserRoleDto } from "../dtos";
import { RoleService, UserService } from "../services";
import { PermissionGuard } from "../../../core/guards/permission.guard";
import { Permission, Prefix, Status } from "../../../core/enums";
import { IPaginatedResponse, IPagination, ISort, IStatusResponse } from "../../../core/entity";
import { Pager, ReqUser, Roles, Sorter } from "../../../core/decorators";
import { BulkDeleteDto, UpdateStatusDto } from "../../../core/dtos";
import { JwtAuthGuard } from "../../../core/guards";
import { relations } from "../../../core/config";
import { DefaultRoles } from "../enums/default-roles.enum";
import { Not } from "typeorm";
import { AuthService } from "../../auth/services";
import { UpdateMeDto } from "../dtos/update-me.dto";

@Controller(Prefix.USER)
export class UserController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly roleService: RoleService,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get("me")
    getMe(@ReqUser() user: User): Promise<User> {
        return this.get(user.id);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.USER_GET)
    @Get(":id")
    get(@Param("id", ParseIntPipe) id: number): Promise<User> {
        return this.userService.get(id, { relations: ["role", "course", ...relations] });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.USER_GET)
    @Get()
    async getAll(
        @Pager() pagination: IPagination,
        @Sorter() sort: ISort<User>,
        @Query("status") status: Status,
        @Query("keyword") keyword?: string,
    ): Promise<IPaginatedResponse<User>> {
        const role = await this.roleService.getOne({ name: DefaultRoles.SUPER_ADMIN });
        const where = status ? { status } : {};
        return this.userService.getMany(
            { ...where, role: Not(role.id) },
            { ...pagination, ...sort, filter: { keyword, fields: ["name", "username", "studentIdString"] } },
            { relations: ["role", "course", ...relations] },
        );
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.USER_CREATE)
    @Post()
    create(@ReqUser() createdBy: User, @Body() createUserDto: CreateUserDto): Promise<User> {
        const { firstName, lastName } = createUserDto;
        const name = `${firstName} ${lastName}`;
        return this.authService.registerUser({ ...createUserDto, name }, createdBy);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("me")
    updateMe(@ReqUser() user: User, @Body() updateMeDto: UpdateMeDto): Promise<IStatusResponse> {
        return this.update(user, user.id, updateMeDto);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.USER_UPDATE)
    @Patch(":id")
    update(
        @ReqUser() updatedBy: User,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ): Promise<IStatusResponse> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { firstName, lastName, status, role, ...rest } = updateUserDto as User;
        if (rest.password) {
            const authData = AuthService.generatePassword(rest.password);
            rest.password = authData.password;
            rest.salt = authData.salt;
        }
        const name = `${firstName} ${lastName}`;
        return this.userService.update(id, { ...rest, firstName, lastName, name, updatedBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.USER_UPDATE_ROLE)
    @Patch(":id/role")
    updateRole(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateUserRoleDto: UpdateUserRoleDto,
    ): Promise<IStatusResponse> {
        const { role } = updateUserRoleDto;
        return this.userService.update(id, { role });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.USER_UPDATE_STATUS)
    @Patch(":id/status")
    updateStatus(
        @Param("id", ParseIntPipe) id: number,
        @Body() updateStatusDto: UpdateStatusDto,
    ): Promise<IStatusResponse> {
        const { status } = updateStatusDto;
        return this.userService.update(id, { status });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.USER_WIPE)
    @Delete("wipe/:id")
    wipe(@Param("id", ParseIntPipe) id: number): Promise<IStatusResponse> {
        return this.userService.delete(id, undefined, true);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.USER_WIPE)
    @Delete("wipe")
    wipeSelected(@Body() bulkDeleteDto: BulkDeleteDto): Promise<IStatusResponse> {
        const { ids } = bulkDeleteDto;
        return this.userService.deleteByIds(ids, undefined, true);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.USER_DELETE)
    @Delete(":id")
    delete(@ReqUser() deletedBy: User, @Param("id", ParseIntPipe) id: number): Promise<IStatusResponse> {
        return this.userService.delete(id, deletedBy);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.USER_DELETE)
    @Delete()
    deleteSelected(@ReqUser() deletedBy: User, @Body() bulkDeleteDto: BulkDeleteDto): Promise<IStatusResponse> {
        const { ids } = bulkDeleteDto;
        return this.userService.deleteByIds(ids, deletedBy);
    }
}
