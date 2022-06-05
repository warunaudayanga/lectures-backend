import { EntityRepository, FindManyOptions, In } from "typeorm";
import { Schedule } from "../entities";
import { BaseRepository } from "../../../core/entity";
import { DateOnly } from "../../../core/interfaces";

@EntityRepository(Schedule)
export class ScheduleRepository extends BaseRepository<Schedule> {
    getByDates(dates: DateOnly[], options?: FindManyOptions<Schedule>): Promise<Schedule[]> {
        return this.find({ where: { date: In(dates) }, ...options });
    }
}
