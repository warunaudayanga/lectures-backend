import { Entity, Column, OneToMany, Index } from "typeorm";
import { User } from "./user.entity";
import { IRole } from "../interfaces";
import { Permission } from "../../../core/enums";
import { BaseEntity } from "../../../core/entity";

@Entity({ name: "roles" })
export class Role extends BaseEntity implements IRole {
    @Index({ unique: true })
    @Column()
    name: string;

    @Column({ type: "json" })
    permissions?: Permission[];

    @OneToMany(() => User, (user) => user.role)
    users?: User[];
}
