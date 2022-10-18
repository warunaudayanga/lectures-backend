import { EntityRepository, FindManyOptions, In } from "typeorm";
import { Schedule } from "../entities";
import { BaseRepository } from "../../../core/entity";

@EntityRepository(Schedule)
export class ScheduleRepository extends BaseRepository<Schedule> {
    getByDates(dates: string[], options?: FindManyOptions<Schedule>): Promise<Schedule[]> {
        return this.find({ where: { date: In(dates) }, ...options });
    }
}
