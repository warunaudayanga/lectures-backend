import { EntityRepository } from "typeorm";
import { CourseModule } from "../entities";
import { BaseRepository } from "../../../core/entity";

@EntityRepository(CourseModule)
export class CourseModuleRepository extends BaseRepository<CourseModule> {}
