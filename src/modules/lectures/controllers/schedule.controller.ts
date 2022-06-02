import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { PermissionGuard } from "../../../core/guards/permission.guard";
import { ScheduleService } from "../services";
import { Schedule } from "../entities";
import { CreateScheduleDto, UpdateScheduleDto } from "../dtos";
import { User } from "../../user/entities";
import { Permission, Prefix, Status } from "../../../core/enums";
import { IPaginatedResponse, IPagination, ISort, IStatusResponse } from "../../../core/entity";
import { Pager, ReqUser, Roles, Sorter } from "../../../core/decorators";
import { BulkDeleteDto, UpdateStatusDto } from "../../../core/dtos";
import { JwtAuthGuard } from "../../../core/guards";
import { relations } from "../../../core/config";

@Controller(Prefix.SCHEDULE)
export class ScheduleController {
    constructor(private scheduleService: ScheduleService) {}

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SCHEDULE_GET)
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    get(@Param("id", ParseIntPipe) id: number): Promise<Schedule> {
        return this.scheduleService.get(id, { relations });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SCHEDULE_GET)
    @Get()
    async getAll(
        @Pager() pagination: IPagination,
        @Sorter() sort: ISort<Schedule>,
        @Query("status") status: Status,
    ): Promise<IPaginatedResponse<Schedule>> {
        return await this.scheduleService.getMany(status ? { status } : {}, { ...pagination, ...sort }, { relations });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SCHEDULE_CREATE)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@ReqUser() createdBy: User, @Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
        return this.scheduleService.create({ ...createScheduleDto, createdBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SCHEDULE_UPDATE)
    @Patch(":id")
    update(
        @ReqUser() updatedBy: User,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateScheduleDto: UpdateScheduleDto,
    ): Promise<IStatusResponse> {
        return this.scheduleService.update(id, { ...updateScheduleDto, updatedBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SCHEDULE_UPDATE_STATUS)
    @Patch(":id/status")
    updateStatus(
        @ReqUser() updatedBy: User,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateStatusDto: UpdateStatusDto,
    ): Promise<IStatusResponse> {
        const { status } = updateStatusDto;
        return this.scheduleService.update(id, { status, updatedBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SCHEDULE_WIPE)
    @Delete("wipe/:id")
    wipe(@Param("id", ParseIntPipe) id: number): Promise<IStatusResponse> {
        return this.scheduleService.delete(id, undefined, true);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SCHEDULE_WIPE)
    @Delete("wipe")
    wipeSelected(@Body() bulkDeleteDto: BulkDeleteDto): Promise<IStatusResponse> {
        const { ids } = bulkDeleteDto;
        return this.scheduleService.deleteByIds(ids, undefined, true);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SCHEDULE_DELETE)
    @Delete(":id")
    delete(@ReqUser() deletedBy: User, @Param("id", ParseIntPipe) id: number): Promise<IStatusResponse> {
        return this.scheduleService.delete(id, deletedBy);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SCHEDULE_DELETE)
    @Delete()
    deleteSelected(@ReqUser() deletedBy: User, @Body() bulkDeleteDto: BulkDeleteDto): Promise<IStatusResponse> {
        const { ids } = bulkDeleteDto;
        return this.scheduleService.deleteByIds(ids, deletedBy);
    }
}
