import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Course } from "../entities";
import { CourseRepository } from "../repositories";
import { EntityService, IStatusResponse } from "../../../core/entity";
import { CourseModuleService } from "./course-module.service";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { DeepPartial } from "typeorm/common/DeepPartial";
import { SaveOptions } from "typeorm";
import { ICourseModule } from "../interfaces";

@Injectable()
export class CourseService extends EntityService<Course> {
    constructor(
        @InjectRepository(CourseRepository) private courseRepository: CourseRepository,
        private moduleService: CourseModuleService,
    ) {
        super(courseRepository, "course", "code");
    }

    async createCourse<T extends DeepPartial<Course>>(
        createDto: T,
        modules?: ICourseModule[] | number[],
        options?: SaveOptions,
    ): Promise<Course> {
        let course = await this.courseRepository.save(createDto, options);
        if (modules?.length) {
            await this.moduleService.updateByIds(
                modules.map((m) => (typeof m === "object" ? m.id : m) as number),
                { course },
            );
        }
        return this.get(course.id, { relations: ["modules"] });
    }

    async updateCourse<T extends QueryDeepPartialEntity<Course>>(
        id: number,
        updateDto: T,
        modules?: ICourseModule[] | number[],
    ): Promise<IStatusResponse> {
        if (modules?.length) {
            const course = await this.get(id);
            await this.moduleService.updateByIds(
                modules.map((m) => (typeof m === "object" ? m.id : m) as number),
                { course },
            );
        }
        return await super.update(id, updateDto);
    }
}
