import { EntityRepository } from "typeorm";
import { Schedule } from "../entities";
import { BaseRepository } from "../../../core/entity";

@EntityRepository(Schedule)
export class ScheduleRepository extends BaseRepository<Schedule> {}
