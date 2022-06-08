import { Column, Entity, Index } from "typeorm";
import { BaseEntity } from "../../../core/entity";
import { Time } from "../../../core/interfaces";
import { ISlot } from "../interfaces/slot.interface";

@Entity({ name: "slots" })
export class Slot extends BaseEntity implements ISlot {
    @Index({ unique: true })
    @Column({ nullable: false })
    number: number;

    @Column("time", { nullable: false })
    startAt: Time;

    @Column("time", { nullable: false })
    endAt: Time;
}
