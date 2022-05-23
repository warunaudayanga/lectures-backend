import { ICourse } from "./course.interface";
import { Department } from "../enums";
import { IBaseEntity } from "../../../core/entity";

export interface ICourseModule extends IBaseEntity {
    name: string;
    department: Department;
    semester: number;
    credits: number;
    serial: string;
    revised: boolean;
    course?: ICourse;
    code?: string;
}
