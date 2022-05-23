import { AfterLoad, Column, Entity, Index, ManyToOne } from "typeorm";
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

    code?: string;

    @AfterLoad()
    afterLoad(): void {
        const dept = this.department;
        const semester = this.semester;
        const credits = String(this.credits).length === 1 ? `0${this.credits}` : this.credits;
        const serial = this.serial;
        const revised = this.revised ? "1" : "0";
        this.code = `${dept}${semester}${credits}${serial}${revised}`;
    }
}
