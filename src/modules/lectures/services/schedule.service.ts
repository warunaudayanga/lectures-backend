import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Schedule } from "../entities";
import { EntityService, EntityUtils } from "../../../core/entity";
import { ScheduleRepository } from "../repositories";
import { FindManyOptions } from "typeorm";
import { groupBy } from "../../../core/utils/common.utils";
import * as moment from "moment";
import { Day, Status } from "../../../core/enums";
import { TimetableService } from "./timetable.service";
import { relations } from "../../../core/config";
import { SaveScheduleListDto } from "../dtos/save-schedule-list.dto";
import { User } from "../../user/entities";
import { SocketService } from "../../../core/modules/socket/services/socket.service";

@Injectable()
export class ScheduleService extends EntityService<Schedule> {
    constructor(
        @InjectRepository(ScheduleRepository) private scheduleRepository: ScheduleRepository,
        protected readonly socketService: SocketService,
        private readonly timetableService: TimetableService,
    ) {
        super(socketService, scheduleRepository, "schedule", "date and slot");
    }

    async getByDate(
        date: string,
        options?: FindManyOptions<Schedule>,
    ): Promise<{ schedule: Schedule[]; generated: boolean }> {
        try {
            let [schedule] = await this.scheduleRepository.getMany({ date }, null, {
                ...options,
                order: { startAt: "ASC" },
            });
            if (schedule.length) {
                return { schedule, generated: false };
            }
            const day = moment(date).format("dddd").toUpperCase() as Day;
            const scheduleEntry: Schedule = { date, day, status: Status.ACTIVE, createdAt: null } as Schedule;
            const { data } = await this.timetableService.getMany({ day }, null, {
                relations: ["course", "module", "lecturer", "lecturerL2", "slot", "slotL2", ...relations],
            });
            if (!data) {
                return { schedule: [], generated: false };
            }
            const generatedSchedule = data.map((entry) => ({
                ...scheduleEntry,
                entry,
                module: entry.module,
                slot: entry.slot.number,
                startAt: entry.slot.startAt,
                startAtL2: entry.slot.startAt,
                endAt: entry.slot.endAt,
                endAtL2: entry.slot.endAt,
            }));
            return { schedule: generatedSchedule, generated: true };
        } catch (e: any) {
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }

    async getByDates(dates: string[], options?: FindManyOptions<Schedule>): Promise<Map<string, Array<Schedule>>> {
        try {
            const schedules = await this.scheduleRepository.getByDates(dates, options);
            return groupBy(schedules, (entry) => entry.date);
        } catch (e: any) {
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }

    async save(saveScheduleListDto: SaveScheduleListDto, createdBy: User): Promise<Schedule[]> {
        let { date, schedules } = saveScheduleListDto;
        const deleteList = await this.getWithoutPagination({ date });
        if (deleteList.length) {
            await this.deleteByIds(
                deleteList.map((s) => s.id),
                undefined,
                true,
            );
        }
        schedules.sort((a, b) => (a.startAt > b.startAt ? 1 : -1));
        schedules = schedules.map((s, i) => ({ ...s, slot: i + 1, createdBy }));
        return await this.createMany(schedules);
    }

    async getLectureDates(): Promise<string[]> {
        const [schedules] = await this.scheduleRepository.getMany();
        return Array.from(groupBy(schedules, (schedules) => schedules.date).keys());
    }
}
