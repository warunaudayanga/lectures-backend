import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, UseGuards } from "@nestjs/common";
import { PermissionGuard } from "../../../core/guards/permission.guard";
import { ClickService } from "../services";
import { Click } from "../entities";
import { CreateClickDto } from "../dtos";
import { User } from "../../user/entities";
import { Permission, Prefix, Status } from "../../../core/enums";
import { IPaginatedResponse, IPagination, ISort } from "../../../core/entity";
import { Pager, ReqUser, Roles, Sorter } from "../../../core/decorators";
import { JwtAuthGuard } from "../../../core/guards";

const relations = ["createdBy", "schedule", "timetable"];

@Controller(Prefix.CLICK)
export class ClickController {
    constructor(private clickService: ClickService) {}

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.LECTURER_GET)
    @Get("all")
    async getAllWithoutPagination(@Query("status") status: Status): Promise<Click[]> {
        return await this.clickService.getWithoutPagination(status ? { status } : {}, { relations });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.LECTURER_GET)
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    get(@Param("id", ParseIntPipe) id: number): Promise<Click> {
        return this.clickService.get(id, { relations });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.LECTURER_GET)
    @Get()
    async getAll(
        @Pager() pagination: IPagination,
        @Sorter() sort: ISort<Click>,
        @Query("status") status?: Status,
        @Query("keyword") keyword?: string,
    ): Promise<IPaginatedResponse<Click>> {
        return await this.clickService.getMany(
            status ? { status } : {},
            { ...pagination, ...sort, filter: { keyword, fields: ["type"] } },
            { relations },
        );
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.LECTURER_CREATE)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@ReqUser() createdBy: User, @Body() createClickDto: CreateClickDto): Promise<Click> {
        return this.clickService.create({ ...createClickDto, createdBy });
    }
}
