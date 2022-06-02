import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Timetable } from "../entities";
import { EntityService, IStatusResponse } from "../../../core/entity";
import { TimetableRepository } from "../repositories";
import { groupBy } from "../../../core/utils/common.utils";
import { Day } from "../../../core/enums";
import { FindManyOptions } from "typeorm";
import { User } from "../../user/entities";
import { SaveTimetableDto } from "../dtos/save-timetable.dto";

@Injectable()
export class TimetableService extends EntityService<Timetable> {
    constructor(@InjectRepository(TimetableRepository) private timetableRepository: TimetableRepository) {
        super(timetableRepository, "timetable", "day and slot");
    }

    async getTimetable(options?: FindManyOptions<Timetable>): Promise<Map<Day, Array<Timetable>>> {
        const [timetable] = await this.repository.getMany(undefined, undefined, options);
        return groupBy(timetable, (entry) => entry.day);
    }

    async saveTimetable(saveTimetableDto: SaveTimetableDto, updatedBy: User): Promise<IStatusResponse> {
        return await this.timetableRepository.saveBulk(saveTimetableDto, updatedBy);
    }
}
