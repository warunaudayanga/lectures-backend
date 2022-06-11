import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import { ILecturer } from "../interfaces";
import { Status, Title } from "../../../core/enums";
import { User } from "../../user/entities";

@Entity({ name: "lecturer" })
export class Lecturer implements ILecturer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "enum", enum: Title, nullable: false })
    title: Title;

    @Column({ nullable: false })
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    mobile: string;

    @Column({ nullable: true })
    profileImage: string;

    @Column({ nullable: true })
    name: string;

    @Column({ type: "enum", enum: Status, default: Status.INACTIVE })
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
