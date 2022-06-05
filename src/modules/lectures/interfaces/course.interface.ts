import { ICourseModule } from "./course-module.interface";
import { IUser } from "../../user/interfaces";
import { IBaseEntity } from "../../../core/entity";

export interface ICourse extends IBaseEntity {
    name: string;
    code: string;
    modules?: ICourseModule[];
    users?: IUser[];
    courseString: string;
}
