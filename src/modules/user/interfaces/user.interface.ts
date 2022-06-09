import { IRole } from "./role.interface";
import { ICourse } from "../../lectures/interfaces";
import { IBaseEntity } from "../../../core/entity";

export interface IUser extends IBaseEntity {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    salt: string;
    profileImage?: string;
    role?: IRole;
    course?: ICourse;
    studentId: number;
    studentIdString: string;
    studentIdVerified: boolean;
    phone?: string;
    phoneVerified: boolean;
    email?: string;
    emailVerified: boolean;
    name: string;
}
