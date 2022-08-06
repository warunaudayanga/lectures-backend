import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm";
import { Day, Status } from "../../../core/enums";
import { Course } from "./course.entity";
import { CourseModule } from "./course-module.entity";
import { Lecturer } from "./lecturer.entity";
import { Slot } from "./slot.entity";
import { ITimetable } from "../interfaces";
import { User } from "../../user/entities";

@Unique(["day", "slot"])
@Entity({ name: "timetable" })
export class Timetable implements ITimetable {
    @PrimaryGeneratedColumn()
    id: number;

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
    meetingsUrl?: string;

    @Column({ nullable: true })
    recordingsUrl?: string;

    @Column({ nullable: true })
    documentsUrl?: string;

    @Column({ nullable: true })
    meetingsUrlL2?: string;

    @Column({ nullable: true })
    recordingsUrlL2?: string;

    @Column({ nullable: true })
    documentsUrlL2?: string;

    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    status: Status | string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User)
    createdBy: User;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User)
    updatedBy?: User;

    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToOne(() => User)
    deletedBy?: User;
}
