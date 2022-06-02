import { Column, Entity, Unique } from "typeorm";
import { ISchedule } from "../interfaces";
import { DateOnly } from "../../../core/interfaces";
import { now } from "../../../core/utils";
import { BaseTimetable } from "./base-timetable";

@Unique(["date", "day", "slot"])
@Entity({ name: "schedule" })
export class Schedule extends BaseTimetable implements ISchedule {
    // @Column("year", { nullable: false })
    // year: Year;
    //
    // @Column("date", { nullable: false })
    // fromDate: DateOnly;
    //
    // @Column("date", { default: null })
    // toDate: DateOnly;

    @Column("date", { nullable: false, default: now("YYYY-MM-DD") })
    date: DateOnly;
}
