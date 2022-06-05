import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Timetable } from "../entities";
import { EntityService, EntityUtils, IStatusResponse } from "../../../core/entity";
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
        try {
            const [timetable] = await this.repository.getMany(undefined, undefined, options);
            return groupBy(timetable, (entry) => entry.day);
        } catch (e: any) {
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }

    async saveTimetable(saveTimetableDto: SaveTimetableDto, updatedBy: User): Promise<IStatusResponse> {
        try {
            return await this.timetableRepository.saveBulk(saveTimetableDto, updatedBy);
        } catch (e: any) {
            EntityUtils.handleError(e, this.entityName, this.uniqueFieldName);
        }
    }
}
