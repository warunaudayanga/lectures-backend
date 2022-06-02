import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { PermissionGuard } from "../../../core/guards/permission.guard";
import { CreateSlotDto, UpdateSlotDto } from "../dtos";
import { SlotService } from "../services";
import { Slot } from "../entities";
import { User } from "../../user/entities";
import { Permission, Prefix, Status } from "../../../core/enums";
import { IStatusResponse } from "../../../core/entity";
import { ReqUser, Roles } from "../../../core/decorators";
import { BulkDeleteDto, UpdateStatusDto } from "../../../core/dtos";
import { JwtAuthGuard } from "../../../core/guards";

@Controller(Prefix.SLOT)
export class SlotController {
    constructor(private slotService: SlotService) {}

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SLOT_GET)
    @Get("all")
    async getAll(@Query("status") status: Status): Promise<Slot[]> {
        return await this.slotService.getWithoutPagination(status ? { status } : {});
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SLOT_GET)
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    get(@Param("id", ParseIntPipe) id: number): Promise<Slot> {
        return this.slotService.get(id);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SLOT_CREATE)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@ReqUser() createdBy: User, @Body() createSlotDto: CreateSlotDto): Promise<Slot> {
        return this.slotService.create({ ...createSlotDto, createdBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SLOT_UPDATE)
    @Patch(":id")
    update(
        @ReqUser() updatedBy: User,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateSlotDto: UpdateSlotDto,
    ): Promise<IStatusResponse> {
        return this.slotService.update(id, { ...updateSlotDto, updatedBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SLOT_UPDATE_STATUS)
    @Patch(":id/status")
    updateStatus(
        @ReqUser() updatedBy: User,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateStatusDto: UpdateStatusDto,
    ): Promise<IStatusResponse> {
        const { status } = updateStatusDto;
        return this.slotService.update(id, { status, updatedBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SLOT_WIPE)
    @Delete("wipe/:id")
    wipe(@Param("id", ParseIntPipe) id: number): Promise<IStatusResponse> {
        return this.slotService.delete(id, undefined, true);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SLOT_WIPE)
    @Delete("wipe")
    wipeSelected(@Body() bulkDeleteDto: BulkDeleteDto): Promise<IStatusResponse> {
        const { ids } = bulkDeleteDto;
        return this.slotService.deleteByIds(ids, undefined, true);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SLOT_DELETE)
    @Delete(":id")
    delete(@ReqUser() deletedBy: User, @Param("id", ParseIntPipe) id: number): Promise<IStatusResponse> {
        return this.slotService.delete(id, deletedBy);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.SLOT_DELETE)
    @Delete()
    deleteSelected(@ReqUser() deletedBy: User, @Body() bulkDeleteDto: BulkDeleteDto): Promise<IStatusResponse> {
        const { ids } = bulkDeleteDto;
        return this.slotService.deleteByIds(ids, deletedBy);
    }
}
