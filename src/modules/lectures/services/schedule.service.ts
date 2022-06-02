import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Schedule } from "../entities";
import { EntityService } from "../../../core/entity";
import { ScheduleRepository } from "../repositories";

@Injectable()
export class ScheduleService extends EntityService<Schedule> {
    constructor(@InjectRepository(ScheduleRepository) private scheduleRepository: ScheduleRepository) {
        super(scheduleRepository, "schedule", "date");
    }
}
