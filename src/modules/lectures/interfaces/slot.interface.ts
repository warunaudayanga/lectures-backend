import { IBaseEntity } from "../../../core/entity";

export interface ISScheduledSlot {
    number: number;
    startAt: string;
    endAt: string;
}

export interface ISlot extends ISScheduledSlot, IBaseEntity {}
