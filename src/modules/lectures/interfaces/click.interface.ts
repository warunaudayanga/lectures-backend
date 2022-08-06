import { IBaseEntity } from "../../../core/entity";
import { ButtonType, ClickType } from "../enums";
import { Schedule, Timetable } from "../entities";

export interface IClick extends IBaseEntity {
    id: number;
    type: ClickType;
    button: ButtonType;
    schedule?: Schedule;
    timetable?: Timetable;
}
