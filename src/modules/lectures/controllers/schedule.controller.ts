import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { PermissionGuard } from "../../../core/guards/permission.guard";
import { ScheduleService } from "../services";
import { Schedule } from "../entities";
import { UpdateScheduleDto } from "../dtos";
import { User } from "../../user/entities";
import { Permission, Prefix, Status } from "../../../core/enums";
import { IPaginatedResponse, IPagination, ISort, IStatusResponse } from "../../../core/entity";
import { Pager, ReqUser, Roles, Sorter } from "../../../core/decorators";
import { BulkDeleteDto, UpdateStatusDto } from "../../../core/dtos";
import { JwtAuthGuard } from "../../../core/guards";
import { relations as rel } from "../../../core/config";
import { DateOnly } from "../../../core/interfaces";
import { SaveScheduleListDto } from "../dtos/save-schedule-list.dto";

const relations = [
    "entry",
    "module",
    "lecturer",
    "lecturerL2",
    "entry.module",
    "entry.lecturer",
    "entry.lecturerL2",
    "entry.slot",
    "entry.slotL2",
    ...rel,
];

@Controller(Prefix.SCHEDULE)
export class ScheduleController {
    constructor(private scheduleService: ScheduleService) {}

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.TIMETABLE_GET)
    @Get("by-date/:date")
    async getByDate(@Param("date") date: DateOnly): Promise<{ schedule: Schedule[]; generated: boolean }> {
        return await this.scheduleService.getByDate(date, { relations });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.TIMETABLE_GET)
    @Post("by-dates")
    async getByDates(@Body("dates") dates: DateOnly[]): Promise<Map<DateOnly, Array<Schedule>>> {
        return await this.scheduleService.getByDates(dates, { relations });
    }

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
        return await this.scheduleService.getMany(
            status ? { status } : {},
            { ...pagination, ...sort },
            { relations: ["entry", ...relations] },
        );
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SCHEDULE_CREATE)
    @UseGuards(JwtAuthGuard)
    @Post()
    save(@ReqUser() createdBy: User, @Body() saveScheduleListDto: SaveScheduleListDto): Promise<Schedule[]> {
        return this.scheduleService.save(saveScheduleListDto, createdBy);
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
