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
import { CourseType } from "../enums";

@Injectable()
export class CourseService extends EntityService<Course> {
    constructor(
        @InjectRepository(CourseRepository) private courseRepository: CourseRepository,
        private moduleService: CourseModuleService,
    ) {
        super(courseRepository, "course", "year and code");
    }

    async createCourse<T extends DeepPartial<Course>>(
        createDto: T,
        modules?: ICourseModule[] | number[],
        options?: SaveOptions,
    ): Promise<Course> {
        const { code, year, type } = createDto;
        const courseString = `${code}/${String(year).slice(2, 4)}/${type === CourseType.FULL_TIME ? "B1" : "B2"}`;
        let course = await this.create({ ...createDto, courseString }, options);
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
        const { code, year, type } = updateDto;
        const courseString = `${code}/${String(year).slice(2, 4)}/${type === CourseType.FULL_TIME ? "B1" : "B2"}`;
        if (modules?.length) {
            const course = await this.get(id);
            await this.moduleService.updateByIds(
                modules.map((m) => (typeof m === "object" ? m.id : m) as number),
                { course },
            );
        }
        return await this.update(id, { ...updateDto, courseString });
    }
}
