import { IBaseEntity } from "../../../core/entity";
import { Time } from "../../../core/interfaces";

export interface ISlot extends IBaseEntity {
    startAt: Time;
    endAt: Time;
}
