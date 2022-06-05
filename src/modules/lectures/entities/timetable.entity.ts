import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { Day, Status } from "../../../core/enums";
import { Course } from "./course.entity";
import { CourseModule } from "./course-module.entity";
import { Lecturer } from "./lecturer.entity";
import { Slot } from "./slot.entity";
import { BaseEntity } from "../../../core/entity";
import { ITimetable } from "../interfaces";

@Unique(["day", "slot"])
@Entity({ name: "timetable" })
export class Timetable extends BaseEntity implements ITimetable {
    @ManyToOne(() => Course, { nullable: true })
    course: Course;

    @ManyToOne(() => CourseModule, { nullable: false })
    module: CourseModule;

    @ManyToOne(() => Lecturer, { nullable: true })
    lecturer?: Lecturer;

    @ManyToOne(() => Lecturer, { nullable: true })
    lecturerL2: Lecturer;

    @Column({ type: "enum", enum: Day, nullable: false })
    day: Day;

    @ManyToOne(() => Slot, { nullable: false })
    slot: Slot;

    @ManyToOne(() => Slot, { nullable: true })
    slotL2: Slot;

    @Column({ nullable: true })
    recordingsUrl?: string;

    @Column({ nullable: true })
    documentsUrl?: string;

    @Column({ nullable: true })
    recordingsUrlL2?: string;

    @Column({ nullable: true })
    documentsUrlL2?: string;

    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    status: Status | string;
}
