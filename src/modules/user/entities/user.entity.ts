import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm";
import { Exclude } from "class-transformer";
import { Role } from "./role.entity";
import { IUser } from "../interfaces";
import { Course } from "../../lectures/entities";
import { Status } from "../../../core/enums";
import { Poll } from "../../poll/entities";

@Unique("COURSE_STUDENT_ID", ["course", "studentId"])
@Unique("USERNAME", ["username"])
@Entity({ name: "users" })
export class User implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 20, nullable: false })
    firstName: string;

    @Column({ length: 20, nullable: false })
    lastName: string;

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

    @Column({ default: false })
    courseVerified: boolean;

    @Column({ nullable: false })
    studentId: number;

    @Column({ default: false })
    studentIdVerified: boolean;

    @Column({ nullable: true })
    phone?: string;

    @Column({ default: false })
    phoneVerified: boolean;

    @Column({ nullable: true })
    email?: string;

    @Column({ default: false })
    emailVerified: boolean;

    @Column({ nullable: true })
    name: string;

    @Column()
    studentIdString: string;

    @ManyToMany(() => Poll, (poll) => poll.users)
    votedPolls: Poll[];

    @Column({ type: "enum", enum: Status, default: Status.INACTIVE })
    status: Status | string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User)
    // eslint-disable-next-line no-use-before-define
    createdBy?: User;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User)
    // eslint-disable-next-line no-use-before-define
    updatedBy?: User;

    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToOne(() => User)
    // eslint-disable-next-line no-use-before-define
    deletedBy?: User;
}
