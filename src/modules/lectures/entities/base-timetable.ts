import { Column, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../core/entity";
import { ITimetable } from "../interfaces";
import { Course } from "./course.entity";
import { CourseModule } from "./course-module.entity";
import { Lecturer } from "./lecturer.entity";
import { Day } from "../../../core/enums";
import { Slot } from "./slot.entity";

export class BaseTimetable extends BaseEntity implements ITimetable {
    @ManyToOne(() => Course, { nullable: true })
    course: Course;

    @ManyToOne(() => CourseModule, { nullable: false })
    module: CourseModule;

    @ManyToOne(() => Lecturer, { nullable: false })
    lecturer: Lecturer;

    // @Column("year", { nullable: false })
    // year: Year;
    //
    // @Column("date", { nullable: false })
    // fromDate: DateOnly;
    //
    // @Column("date", { default: null })
    // toDate: DateOnly;

    @Column({ type: "enum", enum: Day, nullable: false })
    day: Day;

    @ManyToOne(() => Slot, { nullable: false })
    slot: Slot;
}
