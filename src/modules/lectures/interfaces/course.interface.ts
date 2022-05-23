import { ICourseModule } from "./course-module.interface";
import { IUser } from "../../user/interfaces";

export interface ICourse {
    name: string;
    code: string;
    modules?: ICourseModule[];
    users?: IUser[];
    courseString?: string;
}
