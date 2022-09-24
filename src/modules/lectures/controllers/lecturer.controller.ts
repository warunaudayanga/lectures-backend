import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { PermissionGuard } from "../../../core/guards/permission.guard";
import { LecturerService } from "../services";
import { Lecturer } from "../entities";
import { CreateLecturerDto, UpdateLecturerDto } from "../dtos";
import { User } from "../../user/entities";
import { Permission, Endpoint, Status, Title } from "../../../core/enums";
import { IPaginatedResponse, IPagination, ISort, IStatusResponse } from "../../../core/entity";
import { Pager, ReqUser, Roles, Sorter } from "../../../core/decorators";
import { BulkDeleteDto, UpdateStatusDto } from "../../../core/dtos";
import { JwtAuthGuard } from "../../../core/guards";
import { relations } from "../../../core/config";

@Controller(Endpoint.LECTURER)
export class LecturerController {
    constructor(private lecturerService: LecturerService) {}

    @Get("titles")
    getTitles(): string[] {
        return Object.values(Title);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.LECTURER_GET)
    @Get("all")
    async getAllWithoutPagination(@Query("status") status: Status): Promise<Lecturer[]> {
        return await this.lecturerService.getWithoutPagination(status ? { status } : {}, { relations });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.LECTURER_GET)
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    get(@Param("id", ParseIntPipe) id: number): Promise<Lecturer> {
        return this.lecturerService.get(id, { relations });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.LECTURER_GET)
    @Get()
    async getAll(
        @Pager() pagination: IPagination,
        @Sorter() sort: ISort<Lecturer>,
        @Query("status") status?: Status,
        @Query("keyword") keyword?: string,
    ): Promise<IPaginatedResponse<Lecturer>> {
        return await this.lecturerService.getMany(
            status ? { status } : {},
            { ...pagination, ...sort, filter: { keyword, fields: ["firstName", "lastName"] } },
            { relations },
        );
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.LECTURER_CREATE)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@ReqUser() createdBy: User, @Body() createLecturerDto: CreateLecturerDto): Promise<Lecturer> {
        const { title, firstName, lastName } = createLecturerDto;
        const name = `${title} ${firstName} ${lastName}`;
        return this.lecturerService.create({ ...createLecturerDto, name, createdBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.LECTURER_UPDATE)
    @Patch(":id")
    update(
        @ReqUser() updatedBy: User,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateLecturerDto: UpdateLecturerDto,
    ): Promise<IStatusResponse> {
        const { title, firstName, lastName } = updateLecturerDto;
        const name = `${title} ${firstName} ${lastName}`;
        return this.lecturerService.update(id, { ...updateLecturerDto, name, updatedBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.LECTURER_UPDATE_STATUS)
    @Patch(":id/status")
    updateStatus(
        @ReqUser() updatedBy: User,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateStatusDto: UpdateStatusDto,
    ): Promise<IStatusResponse> {
        const { status } = updateStatusDto;
        return this.lecturerService.update(id, { status, updatedBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.LECTURER_WIPE)
    @Delete("wipe/:id")
    wipe(@Param("id", ParseIntPipe) id: number): Promise<IStatusResponse> {
        return this.lecturerService.delete(id, undefined, true);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.LECTURER_WIPE)
    @Delete("wipe")
    wipeSelected(@Body() bulkDeleteDto: BulkDeleteDto): Promise<IStatusResponse> {
        const { ids } = bulkDeleteDto;
        return this.lecturerService.deleteByIds(ids, undefined, true);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.LECTURER_DELETE)
    @Delete(":id")
    delete(@ReqUser() deletedBy: User, @Param("id", ParseIntPipe) id: number): Promise<IStatusResponse> {
        return this.lecturerService.delete(id, deletedBy);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.LECTURER_DELETE)
    @Delete()
    deleteSelected(@ReqUser() deletedBy: User, @Body() bulkDeleteDto: BulkDeleteDto): Promise<IStatusResponse> {
        const { ids } = bulkDeleteDto;
        return this.lecturerService.deleteByIds(ids, deletedBy);
    }
}
