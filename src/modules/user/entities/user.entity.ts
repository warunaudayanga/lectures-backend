import { Column, Entity, ManyToOne, Unique } from "typeorm";
import { Exclude } from "class-transformer";
import { Role } from "./role.entity";
import { IUser } from "../interfaces";
import { Course } from "../../lectures/entities";
import { BaseEntity } from "../../../core/entity";

@Unique("COURSE_STUDENT_ID", ["course", "studentId"])
@Unique("USERNAME", ["username"])
@Entity({ name: "users" })
export class User extends BaseEntity implements IUser {
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

    @Column({
        generatedType: "STORED",
        asExpression: "CONCAT(firstName, ' ', lastName)",
    })
    name: string;

    @Column()
    studentIdString: string;
}
