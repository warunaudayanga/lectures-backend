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
import { Course } from "./course.entity";
import { ICourseModule } from "../interfaces";
import { Department } from "../enums";
import { Status } from "../../../core/enums";
import { User } from "../../user/entities";

@Entity({ name: "modules" })
export class CourseModule implements ICourseModule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: "enum", enum: Department, nullable: false })
    department: Department;

    @Column({ nullable: false })
    semester: number;

    @Column({ nullable: false })
    credits: number;

    @Index({ unique: true })
    @Column({ nullable: false })
    serial: string;

    @Column({ nullable: false })
    revised: boolean;

    @Column({ nullable: false })
    grouped: boolean;

    @ManyToOne(() => Course, (course) => course.modules)
    course?: Course;

    @Column({ nullable: true })
    code: string;

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
