import { Column, Entity, Unique } from "typeorm";
import { BaseTimetable } from "./base-timetable";
import { Status } from "../../../core/enums";

@Unique(["day", "slot"])
@Entity({ name: "timetable" })
export class Timetable extends BaseTimetable {
    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    status: Status | string;
}
