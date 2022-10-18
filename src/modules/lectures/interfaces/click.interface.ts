import { IBaseEntity } from "../../../core/entity";
import { ButtonType, ClickType } from "../enums";
import { ISchedule } from "./schedule.interface";
import { ITimetable } from "./timetable.interface";

export interface IClick extends IBaseEntity {
    type: ClickType;
    button: ButtonType;
    schedule?: ISchedule;
    timetable?: ITimetable;
}
