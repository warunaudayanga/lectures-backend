import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { PermissionGuard } from "../../../core/guards/permission.guard";
import { TimetableService } from "../services";
import { Timetable } from "../entities";
import { CreateTimetableDto } from "../dtos";
import { User } from "../../user/entities";
import { Day, Permission, Prefix } from "../../../core/enums";
import { IPaginatedResponse, IStatusResponse } from "../../../core/entity";
import { ReqUser, Roles } from "../../../core/decorators";
import { BulkDeleteDto, UpdateStatusDto } from "../../../core/dtos";
import { JwtAuthGuard } from "../../../core/guards";
import { relations as rel } from "../../../core/config";
import { SaveTimetableDto } from "../dtos/save-timetable.dto";

const relations = ["course", "module", "lecturer", "lecturerL2", "slot", "slotL2", ...rel];

@Controller(Prefix.TIMETABLE)
export class TimetableController {
    constructor(private timetableService: TimetableService) {}

    @Get("days")
    getDays(): string[] {
        return Object.values(Day);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.TIMETABLE_GET)
    @Get("by-day")
    async getByDay(@Query("day") day: Day): Promise<IPaginatedResponse<Timetable>> {
        return await this.timetableService.getMany({ day }, null, { relations });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.TIMETABLE_GET)
    @Get()
    async getAll(): Promise<Map<Day, Array<Timetable>>> {
        return await this.timetableService.getTimetable({ relations });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.TIMETABLE_GET)
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    get(@Param("id", ParseIntPipe) id: number): Promise<Timetable> {
        return this.timetableService.get(id, { relations });
    }

    // @UseGuards(JwtAuthGuard, PermissionGuard)
    // @Roles(Permission.TIMETABLE_GET)
    // @Get()
    // async getAll(
    //     @Pager() pagination: IPagination,
    //     @Sorter() sort: ISort<Timetable>,
    //     @Query("status") status: Status,
    // ): Promise<IPaginatedResponse<Timetable>> {
    //     return await this.timetableService.getMany(
    //         status ? { status } : {},
    //         { ...pagination, ...sort },
    //         { relations: ["course", "module", "lecturer"] },
    //     );
    // }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.TIMETABLE_CREATE)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@ReqUser() createdBy: User, @Body() createTimetableDto: CreateTimetableDto): Promise<Timetable> {
        return this.timetableService.create({ ...createTimetableDto, createdBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.TIMETABLE_UPDATE)
    @Patch()
    save(@ReqUser() updatedBy: User, @Body() saveTimetableDto: SaveTimetableDto): Promise<IStatusResponse> {
        return this.timetableService.saveTimetable(saveTimetableDto, updatedBy);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.TIMETABLE_UPDATE_STATUS)
    @Patch(":id/status")
    updateStatus(
        @ReqUser() updatedBy: User,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateStatusDto: UpdateStatusDto,
    ): Promise<IStatusResponse> {
        const { status } = updateStatusDto;
        return this.timetableService.update(id, { status, updatedBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.TIMETABLE_WIPE)
    @Delete("wipe/:id")
    wipe(@Param("id", ParseIntPipe) id: number): Promise<IStatusResponse> {
        return this.timetableService.delete(id, undefined, true);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.TIMETABLE_WIPE)
    @Delete("wipe")
    wipeSelected(@Body() bulkDeleteDto: BulkDeleteDto): Promise<IStatusResponse> {
        const { ids } = bulkDeleteDto;
        return this.timetableService.deleteByIds(ids, undefined, true);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.TIMETABLE_DELETE)
    @Delete(":id")
    delete(@ReqUser() deletedBy: User, @Param("id", ParseIntPipe) id: number): Promise<IStatusResponse> {
        return this.timetableService.delete(id, deletedBy);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.TIMETABLE_DELETE)
    @Delete()
    deleteSelected(@ReqUser() deletedBy: User, @Body() bulkDeleteDto: BulkDeleteDto): Promise<IStatusResponse> {
        const { ids } = bulkDeleteDto;
        return this.timetableService.deleteByIds(ids, deletedBy);
    }
}
