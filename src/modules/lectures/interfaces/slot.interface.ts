import { IBaseEntity } from "../../../core/entity";
import { Time } from "../../../core/interfaces";

export interface ISScheduledSlot {
    number: number;
    startAt: Time;
    endAt: Time;
}

export interface ISlot extends ISScheduledSlot, IBaseEntity {}
