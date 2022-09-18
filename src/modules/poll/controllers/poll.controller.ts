import {
    Body,
    ConflictException,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Query,
    UseGuards,
} from "@nestjs/common";
import { PermissionGuard } from "../../../core/guards/permission.guard";
import { CreatePollDto } from "../dtos";
import { PollService } from "../services";
import { Poll, PollVote } from "../entities";
import { User } from "../../user/entities";
import { Permission, Prefix, Status } from "../../../core/enums";
import { IPaginatedResponse, IPagination, IQueryError, ISort, IStatusResponse } from "../../../core/entity";
import { Pager, ReqUser, Roles, Sorter } from "../../../core/decorators";
import { JwtAuthGuard } from "../../../core/guards";
import { relations } from "../../../core/config";
import { VotePollDto } from "../dtos/vote-poll.dto";
import { UpdatePollDto } from "../dtos/update-poll.dto";
import { BulkDeleteDto, UpdateStatusDto } from "../../../core/dtos";
import { randomUUID } from "crypto";
import { PollErrors } from "../responses/poll.error.responses";

export const pollRelations = ["votes", "users", ...relations];

@Controller(Prefix.POLL)
export class PollController {
    constructor(private pollService: PollService) {}

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.POLL_GET)
    @Get("all")
    async getAllWithoutPagination(@Query("status") status: Status): Promise<Poll[]> {
        return await this.pollService.getWithoutPagination(status ? { status } : {}, { relations: pollRelations });
    }

    // @UseGuards(JwtAuthGuard, PermissionGuard)
    // @Roles(Permission.POLL_GET)
    // @Get("opened")
    // async getOpened(
    //     @Pager() pagination: IPagination,
    //     @Sorter() sort: ISort<Poll>,
    //     @Query("status") status?: Status,
    //     @Query("keyword") keyword?: string,
    // ): Promise<IPaginatedResponse<Poll>> {
    //     const now = new Date();
    //     const st = status ? { status } : {};
    //     const or1 = { startTime: null, endTime: null } as FindOneOptions<Poll>["where"];
    //     const or2 = { startTime: LessThan(now), endTime: MoreThan(now) } as FindOneOptions<Poll>["where"];
    //     return await this.pollService.getMany(
    //         [or1, or2],
    //         { ...pagination, ...sort, filter: { keyword, fields: ["name"] } },
    //         { relations: pollRelations },
    //     );
    // }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.POLL_GET)
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    get(@Param("id", ParseIntPipe) id: number): Promise<Poll> {
        return this.pollService.get(id);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.POLL_GET)
    @Get()
    async getAll(
        @Pager() pagination: IPagination,
        @Sorter() sort: ISort<Poll>,
        @Query("status") status: Status,
        @Query("keyword") keyword?: string,
    ): Promise<IPaginatedResponse<Poll>> {
        return await this.pollService.getMany(
            status ? { status } : {},
            { ...pagination, ...sort, filter: { keyword, fields: ["name"] } },
            { relations: pollRelations },
        );
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.POLL_CREATE)
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@ReqUser() createdBy: User, @Body() createSlotDto: CreatePollDto): Promise<Poll> {
        if (!createSlotDto.code) {
            createSlotDto.code = randomUUID();
        }
        const eh = (e: IQueryError): Error | void => {
            if (e.sqlMessage.match("polls.CODE")) {
                return new ConflictException(PollErrors.POLL_409_EXIST_CODE);
            } else if (e.sqlMessage.match("polls.NAME")) {
                return new ConflictException(PollErrors.POLL_409_EXIST_NAME);
            }
        };
        return this.pollService.create({ ...createSlotDto, createdBy }, null, null, eh);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.POLL_VOTE)
    @UseGuards(JwtAuthGuard)
    @Post("vote")
    vote(@ReqUser() createdBy: User, @Body() votePollDto: VotePollDto): Promise<PollVote> {
        votePollDto.poll = { id: votePollDto.pollId };
        if (!votePollDto.anonymous) {
            votePollDto.createdBy = createdBy;
        }
        return this.pollService.vote(votePollDto, createdBy);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.POLL_UPDATE)
    @Patch(":id")
    update(
        @ReqUser() updatedBy: User,
        @Param("id", ParseIntPipe) id: number,
        @Body() updatePollDto: UpdatePollDto,
    ): Promise<IStatusResponse> {
        return this.pollService.update(id, { ...updatePollDto, updatedBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.POLL_UPDATE_STATUS)
    @Patch(":id/status")
    updateStatus(
        @ReqUser() updatedBy: User,
        @Param("id", ParseIntPipe) id: number,
        @Body() updateStatusDto: UpdateStatusDto,
    ): Promise<IStatusResponse> {
        const { status } = updateStatusDto;
        return this.pollService.update(id, { status, updatedBy });
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.POLL_WIPE)
    @Delete("wipe/:id")
    wipe(@Param("id", ParseIntPipe) id: number): Promise<IStatusResponse> {
        return this.pollService.delete(id, undefined, true);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.POLL_WIPE)
    @Delete("wipe")
    wipeSelected(@Body() bulkDeleteDto: BulkDeleteDto): Promise<IStatusResponse> {
        const { ids } = bulkDeleteDto;
        return this.pollService.deleteByIds(ids, undefined, true);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.POLL_DELETE)
    @Delete(":id")
    delete(@ReqUser() deletedBy: User, @Param("id", ParseIntPipe) id: number): Promise<IStatusResponse> {
        return this.pollService.delete(id, deletedBy);
    }

    @UseGuards(JwtAuthGuard, PermissionGuard)
    @Roles(Permission.POLL_DELETE)
    @Delete()
    deleteSelected(@ReqUser() deletedBy: User, @Body() bulkDeleteDto: BulkDeleteDto): Promise<IStatusResponse> {
        const { ids } = bulkDeleteDto;
        return this.pollService.deleteByIds(ids, deletedBy);
    }
}
