import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { PermissionGuard } from "../../../core/guards/permission.guard";
import { CourseService } from "../services";
import { Course } from "../entities";
import { CreateCourseDto, UpdateCourseDto } from "../dtos";
import { User } from "../../user/entities";
import { Permission, Endpoint, Status } from "../../../core/enums";
import { IPaginatedResponse, IPagination, ISort, IStatusResponse } from "../../../core/entity";
import { Pager, ReqUser, Roles, Sorter } from "../../../core/decorators";
import { BulkDeleteDto, UpdateStatusDto } from "../../../core/dtos";
import { JwtAuthGuard } from "../../../core/guards";
import { relations } from "../../../core/config";
import { CourseType } from "../enums";

@Controller(Endpoint.COURSE)
export class CourseController {
    constructor(private courseService: CourseService) {}

    @Get("types")
    getCourseTypes(): string[] {
        return Object.values(CourseType);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.MODULE_GET)
    @Get("all")
    async getAllWithoutPagination(@Query("status") status: Status): Promise<Course[]> {
        return await this.courseService.getWithoutPagination(status ? { status } : {}, { relations });
    }

    // @UseGuards(JwtAuthGuard, PermissionGuard)
    // @Roles(Permission.COURSE_GET)
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    get(@Param("id", ParseIntPipe) id: number): Promise<Course> {
        return this.courseService.get(id, { relations: ["modules", ...relations] });
    }

    // @UseGuards(JwtAuthGuard, PermissionGuard)
    // @Roles(Permission.COURSE_GET)
    @Get()
    async getAll(
        @Pager() pagination: IPagination,
        @Sorter() sort: ISort<Course>,
        @Query("status") status?: Status,
        @Query("keyword") keyword?: string,
    ): Promise<IPaginatedResponse<Course>> {
        return await this.courseService.getMany(
            status ? { status } : {},
            { ...pagination, ...sort, filter: { keyword, fields: ["name", "code"] } },
            { relations: ["modules", ...relations] },
        );
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.COURSE_CREATE)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@ReqUser() createdBy: User, @Body() createCourseDto: CreateCourseDto): Promise<Course> {
        const { modules, ...rest } = createCourseDto;
        return this.courseService.createCourse({ ...rest, createdBy }, modules);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.COURSE_UPDATE)
    @Patch(":id")
    update(
        @ReqUser() updatedBy: User,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateCourseDto: UpdateCourseDto,
    ): Promise<IStatusResponse> {
        const { modules, ...rest } = updateCourseDto;
        return this.courseService.updateCourse(id, { ...rest, updatedBy }, modules);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.COURSE_UPDATE_STATUS)
    @Patch(":id/status")
    updateStatus(
        @ReqUser() updatedBy: User,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateStatusDto: UpdateStatusDto,
    ): Promise<IStatusResponse> {
        const { status } = updateStatusDto;
        return this.courseService.update(id, { status, updatedBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.COURSE_WIPE)
    @Delete("wipe/:id")
    wipe(@Param("id", ParseIntPipe) id: number): Promise<IStatusResponse> {
        return this.courseService.delete(id, undefined, true);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.COURSE_WIPE)
    @Delete("wipe")
    wipeSelected(@Body() bulkDeleteDto: BulkDeleteDto): Promise<IStatusResponse> {
        const { ids } = bulkDeleteDto;
        return this.courseService.deleteByIds(ids, undefined, true);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.COURSE_DELETE)
    @Delete(":id")
    delete(@ReqUser() deletedBy: User, @Param("id", ParseIntPipe) id: number): Promise<IStatusResponse> {
        return this.courseService.delete(id, deletedBy);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.COURSE_DELETE)
    @Delete()
    deleteSelected(@ReqUser() deletedBy: User, @Body() bulkDeleteDto: BulkDeleteDto): Promise<IStatusResponse> {
        const { ids } = bulkDeleteDto;
        return this.courseService.deleteByIds(ids, deletedBy);
    }
}
