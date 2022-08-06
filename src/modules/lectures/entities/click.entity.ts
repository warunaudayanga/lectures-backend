import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities";
import { Status } from "../../../core/enums";
import { ButtonType, ClickType } from "../enums";
import { IClick } from "../interfaces";
import { Timetable } from "./timetable.entity";
import { Schedule } from "./schedule.entity";

@Entity({ name: "clicks" })
export class Click implements IClick {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("enum", { enum: ClickType })
    type: ClickType;

    @Column("enum", { enum: ButtonType })
    button: ButtonType;

    @Column({ type: "json", nullable: true })
    schedule?: Schedule;

    @Column({ type: "json", nullable: true })
    timetable?: Timetable;

    @Column({ type: "enum", enum: Status, default: Status.ACTIVE })
    status: Status | string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User)
    createdBy: User;
}
