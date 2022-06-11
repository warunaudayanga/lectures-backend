import { Injectable } from "@nestjs/common";
import { User } from "../entities";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../repositories";
import { EntityService, IQueryError, IStatusResponse } from "../../../core/entity";
import { DeepPartial } from "typeorm/common/DeepPartial";
import { SaveOptions } from "typeorm";
import { CourseService } from "../../lectures/services";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

@Injectable()
export class UserService extends EntityService<User> {
    constructor(
        @InjectRepository(UserRepository) private userRepository: UserRepository,
        private courseService: CourseService,
    ) {
        super(userRepository, "user", "username");
    }

    async create<T extends DeepPartial<User>>(
        createDto: T,
        options?: SaveOptions,
        eh?: (err: IQueryError) => Error | void,
    ): Promise<User> {
        const { courseString } = await this.courseService.get(createDto.course.id);
        const { firstName, lastName } = createDto;
        const name = `${firstName} ${lastName}`;
        const studentIdString = `${courseString}/${String(createDto.studentId).length === 1 ? "0" : ""}${
            createDto.studentId
        }`;
        return await super.create({ ...createDto, name, studentIdString }, options, eh);
    }

    async update<T extends QueryDeepPartialEntity<User>>(
        id: number,
        updateDto: T,
        eh?: (err: IQueryError) => Error | void,
    ): Promise<IStatusResponse> {
        await super.update(id, updateDto, eh);
        const user = await this.get(id, { relations: ["course"] });
        const { courseString } = await this.courseService.get(user.course.id);
        const studentIdString = `${courseString}/${String(user.studentId).length === 1 ? "0" : ""}${user.studentId}`;
        return await super.update(id, { ...updateDto, studentIdString }, eh);
    }
}
