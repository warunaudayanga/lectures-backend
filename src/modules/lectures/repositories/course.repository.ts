import { EntityRepository } from "typeorm";
import { Course } from "../entities";
import { BaseRepository } from "../../../core/entity";

@EntityRepository(Course)
export class CourseRepository extends BaseRepository<Course> {}
