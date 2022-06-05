import { Column, Entity, ManyToOne } from "typeorm";
import { ISchedule } from "../interfaces";
import { DateOnly, Time } from "../../../core/interfaces";
import { now } from "../../../core/utils";
import { Timetable } from "./timetable.entity";
import { BaseEntity } from "../../../core/entity";
import { Day } from "../../../core/enums";
import { Lecturer } from "./lecturer.entity";
import { CourseModule } from "./course-module.entity";

@Entity({ name: "schedule" })
export class Schedule extends BaseEntity implements ISchedule {
    @ManyToOne(() => Timetable, { nullable: true })
    entry: Timetable;

    @ManyToOne(() => CourseModule, { nullable: false })
    module: CourseModule;

    @ManyToOne(() => Lecturer, { nullable: true })
    lecturer?: Lecturer;

    @ManyToOne(() => Lecturer, { nullable: true })
    lecturerL2?: Lecturer;

    @Column({ type: "enum", enum: Day, nullable: false })
    day: Day;

    @Column({ type: "enum", enum: Day, nullable: true })
    dayL2: Day;

    @Column("date", { nullable: false, default: now("YYYY-MM-DD") })
    date: DateOnly;

    @Column("date", { nullable: true })
    dateL2: DateOnly;

    @Column()
    slot: number;

    @Column("time", { nullable: false })
    startAt: Time;

    @Column("time", { nullable: false })
    endAt: Time;

    @Column({ nullable: true })
    slotL2?: number;

    @Column("time", { nullable: true })
    startAtL2?: Time;

    @Column("time", { nullable: true })
    endAtL2?: Time;

    @Column({ nullable: true })
    meetingId?: string;

    @Column({ nullable: true })
    passcode?: string;

    @Column({ nullable: true })
    meetingUrl?: string;

    @Column({ nullable: true })
    recordingUrl?: string;

    @Column({ nullable: true })
    documentsUrl?: string;

    @Column({ nullable: true })
    meetingIdL2?: string;

    @Column({ nullable: true })
    passcodeL2?: string;

    @Column({ nullable: true })
    meetingUrlL2?: string;

    @Column({ nullable: true })
    recordingUrlL2?: string;

    @Column({ nullable: true })
    documentsUrlL2?: string;
}
