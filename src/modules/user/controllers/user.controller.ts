import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Query, UseGuards } from "@nestjs/common";
import { User } from "../entities";
import { UpdateUserDto, UpdateUserRoleDto } from "../dtos";
import { UserService } from "../services";
import { PermissionGuard } from "../../../core/guards/permission.guard";
import { IUser } from "../interfaces";
import { Permission, Prefix, Status } from "../../../core/enums";
import { IPaginatedResponse, IPagination, ISort, IStatusResponse } from "../../../core/entity";
import { Pager, ReqUser, Roles, Sorter } from "../../../core/decorators";
import { BulkDeleteDto, UpdateStatusDto } from "../../../core/dtos";
import { JwtAuthGuard } from "../../../core/guards";
import { relations } from "../../../core/config";
@Controller(Prefix.USER)
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.USER_GET)
    @Get("get/:id")
    get(@Param("id", ParseIntPipe) id: number): Promise<User> {
        return this.userService.get(id, { relations: ["role", "course", ...relations] });
    }

    @UseGuards(JwtAuthGuard)
    @Get("me")
    getAuthUser(@ReqUser() user: User): Promise<User> {
        return this.userService.get(user.id, { relations: ["role", "course", ...relations] });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.USER_GET)
    @Get()
    getAll(
        @Pager() pagination: IPagination,
        @Sorter() sort: ISort<User>,
        @Query("status") status: Status,
    ): Promise<IPaginatedResponse<User>> {
        return this.userService.getMany(
            status ? { status } : {},
            { ...pagination, ...sort },
            { relations: ["role", "course", ...relations] },
        );
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.USER_UPDATE)
    @Patch(":id")
    update(@Param("id", ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto): Promise<IStatusResponse> {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, salt, status, role, ...rest } = updateUserDto as IUser;
        return this.userService.update(id, { ...rest });
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
