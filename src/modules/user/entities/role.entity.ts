import {
    Entity,
    Column,
    OneToMany,
    Index,
    CreateDateColumn,
    ManyToOne,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";
import { IRole } from "../interfaces";
import { Permission, Status } from "../../../core/enums";

@Entity({ name: "roles" })
export class Role implements IRole {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ unique: true })
    @Column()
    name: string;

    @Column("json")
    permissions?: Permission[];

    @OneToMany(() => User, (user) => user.role)
    users?: User[];

    @Column({ nullable: false })
    priority: number;

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
