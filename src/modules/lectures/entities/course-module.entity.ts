import { Column, Entity, Index, ManyToOne } from "typeorm";
import { Course } from "./course.entity";
import { ICourseModule } from "../interfaces";
import { BaseEntity } from "../../../core/entity";
import { Department } from "../enums";

@Entity({ name: "modules" })
export class CourseModule extends BaseEntity implements ICourseModule {
    @Column()
    name: string;

    @Column({ type: "enum", enum: Department, nullable: false })
    department: Department;

    @Column({ nullable: false })
    semester: number;

    @Column({ nullable: false })
    credits: number;

    @Index({ unique: true })
    @Column({ nullable: false })
    serial: string;

    @Column({ nullable: false })
    revised: boolean;

    @ManyToOne(() => Course, (course) => course.modules)
    course?: Course;

    @Column({
        generatedType: "STORED",
        asExpression:
            "CONCAT(department, semester, IF(LENGTH(credits)=1, CONCAT(0, credits), credits), SERIAL, IF(revised, 1, 0))",
    })
    code: string;
}
