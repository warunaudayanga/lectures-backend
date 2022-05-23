import { AfterLoad, Column, Entity, OneToMany, Unique } from "typeorm";
import { CourseModule } from "./course-module.entity";
import { ICourse } from "../interfaces";
import { User } from "../../user/entities";
import { BaseEntity } from "../../../core/entity";
import { CourseType } from "../enums";

@Entity({ name: "courses" })
@Unique(["code", "year", "type"])
export class Course extends BaseEntity implements ICourse {
    @Column()
    name: string;

    @Column()
    code: string;

    @Column("year", { nullable: false })
    year: number;

    @Column("enum", { enum: CourseType, default: CourseType.PART_TIME })
    type: CourseType;

    @OneToMany(() => CourseModule, (module) => module.course)
    modules?: CourseModule[];

    @OneToMany(() => User, (user) => user.course)
    users?: User[];

    courseString: string;

    @AfterLoad()
    afterLoad(): void {
        const code = this.code;
        const year = String(this.year).slice(2, 4);
        const type = this.type === CourseType.FULL_TIME ? "B1" : "B2";
        this.courseString = `${code}/${year}/${type}`;
    }
}
