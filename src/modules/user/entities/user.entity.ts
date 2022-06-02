import { AfterLoad, Column, Entity, Index, ManyToOne } from "typeorm";
import { Exclude } from "class-transformer";
import { Role } from "./role.entity";
import { IUser } from "../interfaces";
import { Course } from "../../lectures/entities";
import { BaseEntity } from "../../../core/entity";

@Entity({ name: "users" })
export class User extends BaseEntity implements IUser {
    @Column({ length: 20, nullable: false })
    firstName: string;

    @Column({ length: 20, nullable: false })
    lastName: string;

    @Index({ unique: true })
    @Column({ length: 50, nullable: false })
    username: string;

    @Column({ nullable: false })
    @Exclude()
    password: string;

    @Column({ nullable: false })
    @Exclude()
    salt: string;

    @Column({ nullable: true })
    profileImage?: string;

    @ManyToOne(() => Role, (role) => role.users)
    role?: Role;

    @ManyToOne(() => Course, (course) => course.users)
    course?: Course;

    name: string;

    @AfterLoad()
    afterLoad(): void {
        this.name = `${this.firstName} ${this.lastName}`;
    }
}
