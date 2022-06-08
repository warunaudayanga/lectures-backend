import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CourseModule } from "../entities";
import { CourseModuleRepository } from "../repositories";
import { EntityService } from "../../../core/entity";

@Injectable()
export class CourseModuleService extends EntityService<CourseModule> {
    constructor(@InjectRepository(CourseModuleRepository) private moduleRepository: CourseModuleRepository) {
        super(moduleRepository, "module", "code");
    }
}
