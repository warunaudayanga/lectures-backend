import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from "typeorm";
import { CourseModule } from "./course-module.entity";
import { ICourse } from "../interfaces";
import { User } from "../../user/entities";
import { CourseType } from "../enums";
import { Status } from "../../../core/enums";

@Unique(["code", "year", "type"])
@Entity({ name: "courses" })
export class Course implements ICourse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    code: string;

    @Column("year", { nullable: false })
    year: number;

    @Column("enum", { enum: CourseType, default: CourseType.PART_TIME })
    type: CourseType;

    @OneToMany(() => CourseModule, (module) => module.course)
    modules?: CourseModule[];

    @OneToMany(() => User, (user) => user.course)
    users?: User[];

    @Column({ nullable: true })
    courseString: string;

    @Column({ type: "enum", enum: Status, default: Status.INACTIVE })
    status: Status | string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => User)
    createdBy?: User;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User)
    updatedBy?: User;

    @DeleteDateColumn()
    deletedAt?: Date;

    @ManyToOne(() => User)
    deletedBy?: User;
}
