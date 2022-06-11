import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { PermissionGuard } from "../../../core/guards/permission.guard";
import { CreateCourseModuleDto, UpdateCourseModuleDto } from "../dtos";
import { CourseModuleService } from "../services";
import { CourseModule } from "../entities";
import { User } from "../../user/entities";
import { Permission, Prefix, Status } from "../../../core/enums";
import { IPaginatedResponse, IPagination, ISort, IStatusResponse } from "../../../core/entity";
import { Pager, ReqUser, Roles, Sorter } from "../../../core/decorators";
import { BulkDeleteDto, UpdateStatusDto } from "../../../core/dtos";
import { JwtAuthGuard } from "../../../core/guards";
import { relations } from "../../../core/config";
import { Department } from "../enums";

@Controller(Prefix.COURSE_MODULE)
export class CourseModuleController {
    constructor(private moduleService: CourseModuleService) {}

    @Get("departments")
    getDepartments(): string[] {
        return Object.values(Department);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.MODULE_GET)
    @Get("all")
    async getAllWithoutPagination(@Query("status") status: Status): Promise<CourseModule[]> {
        return await this.moduleService.getWithoutPagination(status ? { status } : {}, { relations });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.MODULE_GET)
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    get(@Param("id", ParseIntPipe) id: number): Promise<CourseModule> {
        return this.moduleService.get(id, { relations });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.MODULE_GET)
    @Get()
    async getAll(
        @Pager() pagination: IPagination,
        @Sorter() sort: ISort<CourseModule>,
        @Query("status") status: Status,
        @Query("keyword") keyword?: string,
    ): Promise<IPaginatedResponse<CourseModule>> {
        return await this.moduleService.getMany(
            status ? { status } : {},
            { ...pagination, ...sort, filter: { keyword, fields: ["name"] } },
            { relations },
        );
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.MODULE_CREATE)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@ReqUser() createdBy: User, @Body() moduleDto: CreateCourseModuleDto): Promise<CourseModule> {
        const { department, semester, credits, serial, revised } = moduleDto;
        const code = `${department}${semester}${String(credits).length ? "0" + credits : credits}${serial}${
            revised ? 1 : 0
        }`;
        return this.moduleService.create({ ...moduleDto, code, createdBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.MODULE_UPDATE)
    @Patch(":id")
    update(
        @ReqUser() updatedBy: User,
        @Param("id", ParseIntPipe) id: number,
        @Body() moduleDto: UpdateCourseModuleDto,
    ): Promise<IStatusResponse> {
        const { department, semester, credits, serial, revised } = moduleDto;
        const code = `${department}${semester}${String(credits).length ? "0" + credits : credits}${serial}${
            revised ? 1 : 0
        }`;
        return this.moduleService.update(id, { ...moduleDto, code, updatedBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.MODULE_UPDATE_STATUS)
    @Patch(":id/status")
    updateStatus(
        @ReqUser() updatedBy: User,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateStatusDto: UpdateStatusDto,
    ): Promise<IStatusResponse> {
        const { status } = updateStatusDto;
        return this.moduleService.update(id, { status, updatedBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.MODULE_WIPE)
    @Delete("wipe/:id")
    wipe(@Param("id", ParseIntPipe) id: number): Promise<IStatusResponse> {
        return this.moduleService.delete(id, undefined, true);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.MODULE_WIPE)
    @Delete("wipe")
    wipeSelected(@Body() bulkDeleteDto: BulkDeleteDto): Promise<IStatusResponse> {
        const { ids } = bulkDeleteDto;
        return this.moduleService.deleteByIds(ids, undefined, true);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.MODULE_DELETE)
    @Delete(":id")
    delete(@ReqUser() deletedBy: User, @Param("id", ParseIntPipe) id: number): Promise<IStatusResponse> {
        return this.moduleService.delete(id, deletedBy);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.MODULE_DELETE)
    @Delete()
    deleteSelected(@ReqUser() deletedBy: User, @Body() bulkDeleteDto: BulkDeleteDto): Promise<IStatusResponse> {
        const { ids } = bulkDeleteDto;
        return this.moduleService.deleteByIds(ids, deletedBy);
    }
}
