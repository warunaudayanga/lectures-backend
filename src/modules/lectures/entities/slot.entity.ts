import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { Time } from "../../../core/interfaces";
import { ISlot } from "../interfaces/slot.interface";
import { Status } from "../../../core/enums";
import { User } from "../../user/entities";

@Entity({ name: "slots" })
export class Slot implements ISlot {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column({ nullable: false })
    number: number;

    @Column("time", { nullable: false })
    startAt: Time;

    @Column("time", { nullable: false })
    endAt: Time;

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
